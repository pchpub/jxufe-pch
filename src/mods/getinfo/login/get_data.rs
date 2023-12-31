use crate::mods::{client::types::JxufeClient, types::PchError};
use base64::prelude::*;
use fancy_regex::Regex;
use lazy_static::lazy_static;

pub async fn login(client: &mut JxufeClient) -> Result<String, PchError> {
    // rename from *checkrand()
    // 输入信息验证
    match client.check_login_info() {
        Err(value) => return Err(value),
        Ok(_) => (),
    }

    let _token = &client.password;
    let randnumber = "";
    let password_policy = is_password_policy(&client.username, &client.password)?;
    let url = "https://jwxt.jxufe.edu.cn/cas/logon.action".to_owned();
    let txt_mm_expression = get_txt_mm_expression(&client.password)?;
    let txt_mm_length = &client.password.len();
    let txt_mm_userzh = get_txt_mm_userzh(&client.password, &client.username)?;
    let hid_flag = "1";
    let p_username = "_u".to_owned() + randnumber;
    let p_password = "_p".to_owned() + randnumber;

    // 获取sessionid

    let web_page = client
        .async_getwebpage("https://jwxt.jxufe.edu.cn/cas/login.action", None)
        .await?;

    let sessionid = match client.cookie_map_get_single("JSESSIONID") {
        Some(value) => value,
        None => return Err(().into()),
    };

    println!("sessionid: {}", sessionid);

    let username = BASE64_STANDARD.encode(format!(r#"{};;{}"#, &client.username, sessionid));
    let password = md5(&(md5(&client.password) + &md5(&randnumber.to_lowercase())));
    let mut params = format!("{p_username}={username}&{p_password}={password}&randnumber={randnumber}&isPasswordPolicy={password_policy}&txt_mm_expression={txt_mm_expression}&txt_mm_length={txt_mm_length}&txt_mm_userzh={txt_mm_userzh}&hid_flag={hid_flag}&hidlag=1");
    let deskey: String;
    let nowtime: String;
    (deskey, nowtime) =
        get_setkingoencypt_body(client, &get_setkingoencypt_id(&web_page.1)?).await?;
    params = get_enc_params(&params, &deskey, &nowtime)?;
    let login_result = client.async_postwebpage(&url, None, &params).await.unwrap();

    // todo: check
    let login_result: serde_json::Value =
        if let Ok(value) = serde_json::from_str::<serde_json::Value>(&login_result.1) {
            value
        } else {
            return Err(().into());
        };
    if login_result["status"].as_str().unwrap_or("") != "200" {
        return Err(PchError::WrongPassword);
    }

    let sessionid = match client.cookie_map_get_single("JSESSIONID") {
        Some(value) => value,
        None => return Err(().into()),
    };

    println!("sessionid: {}", sessionid);

    Ok(sessionid.to_string())
}

fn get_txt_mm_expression(password: &str) -> Result<usize, ()> {
    fn char_type(num: char) -> usize {
        let num = num as u8;
        if num >= 48 && num <= 57 {
            return 8;
        }
        if num >= 97 && num <= 122 {
            return 4;
        }
        if num >= 65 && num <= 90 {
            return 2;
        }
        return 1;
    }
    let mut result = 0;
    for c in password.chars() {
        result |= char_type(c);
    }
    Ok(result)
}

fn get_txt_mm_userzh(password: &str, username: &str) -> Result<usize, ()> {
    let mut inuserzh = 0;
    if password
        .to_lowercase()
        .trim()
        .contains(username.to_lowercase().trim())
    {
        inuserzh = 1;
    }
    Ok(inuserzh)
}

fn is_password_policy(username: &str, password: &str) -> Result<usize, ()> {
    if password == "" || password.is_empty() || username == password {
        return Ok(0);
    }
    let passwordlen = password.len();
    if passwordlen < 6 {
        return Ok(0);
    }
    Ok(1)
}

fn get_setkingoencypt_id(web_page_body: &str) -> Result<String, ()> {
    lazy_static! {
        static ref SETKINGOENCYPT: Regex =
            Regex::new(r#"src="/custom/js/SetKingoEncypt.jsp\?t=(?P<id>[0-9]*)""#).unwrap();
    }
    if let Some(value) = SETKINGOENCYPT
        .captures(web_page_body)
        .unwrap()
        .and_then(|cap| {
            cap.name("id")
                .map(|setkingoencypt| setkingoencypt.as_str().to_string())
        })
    {
        return Ok(value);
    } else {
        return Err(());
    }
}

async fn get_setkingoencypt_body(
    client: &mut JxufeClient,
    id: &str,
) -> Result<(String, String), ()> {
    let url = format!(
        "https://jwxt.jxufe.edu.cn/custom/js/SetKingoEncypt.jsp?t={}",
        id
    );
    let (_, body) = client.async_getwebpage(&url, None).await?;
    lazy_static! {
        //var _deskey = '6511675486548812258';
        // var _nowtime = '2023-02-04 12:55:48';
        static ref DESKEY: Regex = Regex::new(r#"var _deskey = '(?P<deskey>[0-9]*)';"#).unwrap();
        static ref NOWTIME: Regex = Regex::new(r#"var _nowtime = '(?P<nowtime>[0-9- :]*)';"#).unwrap();
    }
    let deskey = if let Some(value) = DESKEY
        .captures(&body)
        .unwrap()
        .and_then(|cap| cap.name("deskey").map(|deskey| deskey.as_str().to_string()))
    {
        value
    } else {
        return Err(());
    };
    let nowtime = if let Some(value) = NOWTIME.captures(&body).unwrap().and_then(|cap| {
        cap.name("nowtime")
            .map(|nowtime| nowtime.as_str().to_string())
    }) {
        value
    } else {
        return Err(());
    };
    Ok((deskey, nowtime))
}

fn get_enc_params(params: &str, deskey: &str, timestamp: &str) -> Result<String, ()> {
    let token = md5(&(md5(params) + &md5(timestamp)));
    let mut new_params = BASE64_STANDARD.encode(des_encode(params, deskey));
    new_params = format!("params={new_params}&token={token}&timestamp={timestamp}");
    return Ok(new_params);
}

fn md5(input: &str) -> String {
    let mut md5 = crypto::md5::Md5::new();
    crypto::digest::Digest::input_str(&mut md5, input);
    crypto::digest::Digest::result_str(&mut md5)
}

fn des_encode(data: &str, deskey: &str) -> String {
    return str_enc(data, Some(deskey), None, None);
}

fn str_enc(
    data: &str,
    first_key: Option<&str>,
    second_key: Option<&str>,
    third_key: Option<&str>,
) -> String {
    fn str_to_bt(input: &str) -> [u32; 64] {
        let leng = input.len();
        let mut bt = [0; 64];
        let input_vec = input.clone().chars().into_iter().collect::<Vec<char>>();
        if leng < 4 {
            for i in 0..leng {
                let k = input_vec[i];
                for j in 0..16 {
                    let mut pow = 1;
                    for _m in 0..15 - j {
                        pow *= 2;
                    }
                    bt[16 * i + j] = (k as u32 / pow) % 2;
                }
            }
            for p in leng..4 {
                let k = 0;
                for q in 0..16 {
                    let mut pow = 1;
                    for _m in 0..15 - q {
                        pow *= 2;
                    }
                    bt[16 * p + q] = (k as u32 / pow) % 2;
                }
            }
        } else {
            for i in 0..4 {
                let k = input_vec[i];
                for j in 0..16 {
                    let mut pow = 1;
                    for _m in 0..15 - j {
                        pow *= 2;
                    }
                    bt[16 * i + j] = (k as u32 / pow) % 2;
                }
            }
        }
        return bt;
    }
    fn get_key_bytes(key: &str) -> Vec<Vec<u32>> {
        let mut key_bytes = Vec::new();
        key.chars()
            .into_iter()
            .collect::<Vec<char>>()
            .chunks(4)
            .for_each(|chunk| {
                key_bytes.push(str_to_bt(&chunk.iter().collect::<String>()).to_vec());
            });
        return key_bytes;
    }
    let leng = data.len();
    let mut enc_data = String::new();
    let first_key_bt: Option<Vec<Vec<u32>>>;
    let mut first_length: usize = 0;
    let second_key_bt: Option<Vec<Vec<u32>>>;
    let mut second_length: usize = 0;
    let third_key_bt: Option<Vec<Vec<u32>>>;
    let mut third_length: usize = 0;

    if let Some(key) = first_key {
        if !key.is_empty() {
            let temp = get_key_bytes(key);
            first_length = temp.len();
            first_key_bt = Some(temp);
        } else {
            first_key_bt = None;
        }
    } else {
        first_key_bt = None;
    }

    if let Some(key) = second_key {
        if !key.is_empty() {
            let temp = get_key_bytes(key);
            second_length = temp.len();
            second_key_bt = Some(temp);
        } else {
            second_key_bt = None;
        }
    } else {
        second_key_bt = None;
    }

    if let Some(key) = third_key {
        if !key.is_empty() {
            let temp = get_key_bytes(key);
            third_length = temp.len();
            third_key_bt = Some(temp);
        } else {
            third_key_bt = None;
        }
    } else {
        third_key_bt = None;
    }

    if leng > 0 {
        for temp_data in data.chars().collect::<Vec<char>>().chunks(4) {
            let temp_byte = str_to_bt(temp_data.iter().collect::<String>().as_str());
            let enc_byte;
            if (first_length + second_length + third_length) != 0 {
                let mut temp_bt: [u32; 64] = temp_byte;
                for x in 0..first_length {
                    temp_bt = enc(&temp_bt, &first_key_bt.as_ref().unwrap()[x]);
                }
                for y in 0..second_length {
                    temp_bt = enc(&temp_bt, &second_key_bt.as_ref().unwrap()[y]);
                }
                for z in 0..third_length {
                    temp_bt = enc(&temp_bt, &third_key_bt.as_ref().unwrap()[z]);
                }
                enc_byte = temp_bt;
            } else {
                panic!("key is empty");
            }
            enc_data.push_str(&bt64_to_hex(&enc_byte));
        }
    }
    return enc_data;
}

fn enc(data_byte: &[u32; 64], key_byte: &Vec<u32>) -> [u32; 64] {
    let keys = generate_keys(key_byte);
    let ip_byte = init_permute(data_byte);
    let mut ip_left = [0; 32];
    let mut ip_right = [0; 32];
    let mut temp_left = [0; 32];
    for k in 0..32 {
        ip_left[k] = ip_byte[k];
        ip_right[k] = ip_byte[32 + k];
    }
    for i in 0..16 {
        for j in 0..32 {
            temp_left[j] = ip_left[j];
            ip_left[j] = ip_right[j];
        }
        let mut key = [0; 48];
        for m in 0..48 {
            key[m] = keys[i][m];
        }
        let temp_right = xor_32(
            &p_permute(&s_box_permute(&xor_48(&expand_permute(&ip_right), &key))),
            &temp_left,
        );
        for n in 0..32 {
            ip_right[n] = temp_right[n];
        }
    }
    let mut final_data = [0; 64];
    for i in 0..32 {
        final_data[i] = ip_right[i];
        final_data[32 + i] = ip_left[i];
    }
    return finally_permute(&final_data);
}

fn generate_keys(key_byte: &Vec<u32>) -> Vec<Vec<u32>> {
    let mut key = [0; 56];
    let mut keys = Vec::new(); //16*48
    for _i in 0..16 {
        keys.push(vec![0; 48]);
    }
    let loop_a = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

    for i in 0..7 {
        let mut j = 0;
        let mut k = 7;
        while j < 8 {
            key[i * 8 + j] = key_byte[8 * k + i];
            j += 1;
            if k == 0 {
                break;
            }
            k -= 1;
        }
    }

    for i in 0..16 {
        let mut temp_left: u32;
        let mut temp_right: u32;
        for _j in 0..loop_a[i] {
            temp_left = key[0];
            temp_right = key[28];
            for k in 0..27 {
                key[k] = key[k + 1];
                key[28 + k] = key[29 + k];
            }
            key[27] = temp_left;
            key[55] = temp_right;
        }
        let mut temp_key = Vec::with_capacity(48);
        for _i in 0..48 {
            temp_key.push(0);
        }
        temp_key[0] = key[13];
        temp_key[1] = key[16];
        temp_key[2] = key[10];
        temp_key[3] = key[23];
        temp_key[4] = key[0];
        temp_key[5] = key[4];
        temp_key[6] = key[2];
        temp_key[7] = key[27];
        temp_key[8] = key[14];
        temp_key[9] = key[5];
        temp_key[10] = key[20];
        temp_key[11] = key[9];
        temp_key[12] = key[22];
        temp_key[13] = key[18];
        temp_key[14] = key[11];
        temp_key[15] = key[3];
        temp_key[16] = key[25];
        temp_key[17] = key[7];
        temp_key[18] = key[15];
        temp_key[19] = key[6];
        temp_key[20] = key[26];
        temp_key[21] = key[19];
        temp_key[22] = key[12];
        temp_key[23] = key[1];
        temp_key[24] = key[40];
        temp_key[25] = key[51];
        temp_key[26] = key[30];
        temp_key[27] = key[36];
        temp_key[28] = key[46];
        temp_key[29] = key[54];
        temp_key[30] = key[29];
        temp_key[31] = key[39];
        temp_key[32] = key[50];
        temp_key[33] = key[44];
        temp_key[34] = key[32];
        temp_key[35] = key[47];
        temp_key[36] = key[43];
        temp_key[37] = key[48];
        temp_key[38] = key[38];
        temp_key[39] = key[55];
        temp_key[40] = key[33];
        temp_key[41] = key[52];
        temp_key[42] = key[45];
        temp_key[43] = key[41];
        temp_key[44] = key[49];
        temp_key[45] = key[35];
        temp_key[46] = key[28];
        temp_key[47] = key[31];
        for m in 0..48 {
            keys[i][m] = temp_key[m];
        }
    }
    return keys;
}

fn init_permute(original_data: &[u32; 64]) -> [u32; 64] {
    let mut ip_byte = [0; 64];
    let mut i = 0;
    let mut m = 1;
    let mut n = 0;
    while i < 4 {
        let mut j = 7;
        let mut k = 0;
        loop {
            ip_byte[i * 8 + k] = original_data[j * 8 + m];
            ip_byte[i * 8 + k + 32] = original_data[j * 8 + n];
            if j == 0 {
                break;
            }
            j -= 1;
            k += 1;
        }
        i += 1;
        m += 2;
        n += 2;
    }
    return ip_byte;
}

fn expand_permute(right_data: &[u32; 32]) -> [u32; 48] {
    let mut ep_byte = [0; 48];
    for i in 0..8 {
        if i == 0 {
            ep_byte[i * 6 + 0] = right_data[31];
        } else {
            ep_byte[i * 6 + 0] = right_data[i * 4 - 1];
        }
        ep_byte[i * 6 + 1] = right_data[i * 4 + 0];
        ep_byte[i * 6 + 2] = right_data[i * 4 + 1];
        ep_byte[i * 6 + 3] = right_data[i * 4 + 2];
        ep_byte[i * 6 + 4] = right_data[i * 4 + 3];
        if i == 7 {
            ep_byte[i * 6 + 5] = right_data[0];
        } else {
            ep_byte[i * 6 + 5] = right_data[i * 4 + 4];
        }
    }
    return ep_byte;
}

fn xor_48(byte_one: &[u32; 48], byte_two: &[u32; 48]) -> [u32; 48] {
    let mut xor_byte = [0; 48];
    for i in 0..48 {
        xor_byte[i] = byte_one[i] ^ byte_two[i];
    }
    return xor_byte;
}

fn xor_32(byte_one: &[u32; 32], byte_two: &[u32; 32]) -> [u32; 32] {
    let mut xor_byte = [0; 32];
    for i in 0..32 {
        xor_byte[i] = byte_one[i] ^ byte_two[i];
    }
    return xor_byte;
}

fn s_box_permute(expand_byte: &[u32; 48]) -> [u32; 32] {
    let mut s_box_byte = [0; 32];
    let s1 = [
        [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
        [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
        [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
        [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
    ];

    /* Table - s2 */
    let s2 = [
        [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
        [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
        [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
        [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
    ];

    /* Table - s3 */
    let s3 = [
        [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
        [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
        [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
        [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
    ];
    /* Table - s4 */
    let s4 = [
        [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
        [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
        [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
        [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
    ];

    /* Table - s5 */
    let s5 = [
        [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
        [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
        [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
        [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
    ];

    /* Table - s6 */
    let s6 = [
        [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
        [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
        [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
        [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
    ];

    /* Table - s7 */
    let s7 = [
        [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
        [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
        [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
        [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
    ];

    /* Table - s8 */
    let s8 = [
        [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
        [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
        [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
        [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
    ];

    for m in 0..8 {
        let i = (expand_byte[m * 6 + 0] * 2 + expand_byte[m * 6 + 5]) as usize;
        let j = (expand_byte[m * 6 + 1] * 2 * 2 * 2
            + expand_byte[m * 6 + 2] * 2 * 2
            + expand_byte[m * 6 + 3] * 2
            + expand_byte[m * 6 + 4]) as usize;
        let mut binary = match m {
            0 => s1[i][j],
            1 => s2[i][j],
            2 => s3[i][j],
            3 => s4[i][j],
            4 => s5[i][j],
            5 => s6[i][j],
            6 => s7[i][j],
            7 => s8[i][j],
            _ => panic!("unknown binary"),
        };
        for i in (0..4).rev() {
            s_box_byte[m * 4 + i] = binary % 2;
            binary = binary / 2;
        }
    }
    return s_box_byte;
}

fn p_permute(s_box_byte: &[u32; 32]) -> [u32; 32] {
    let mut p_box_permute = [0; 32];
    p_box_permute[0] = s_box_byte[15];
    p_box_permute[1] = s_box_byte[6];
    p_box_permute[2] = s_box_byte[19];
    p_box_permute[3] = s_box_byte[20];
    p_box_permute[4] = s_box_byte[28];
    p_box_permute[5] = s_box_byte[11];
    p_box_permute[6] = s_box_byte[27];
    p_box_permute[7] = s_box_byte[16];
    p_box_permute[8] = s_box_byte[0];
    p_box_permute[9] = s_box_byte[14];
    p_box_permute[10] = s_box_byte[22];
    p_box_permute[11] = s_box_byte[25];
    p_box_permute[12] = s_box_byte[4];
    p_box_permute[13] = s_box_byte[17];
    p_box_permute[14] = s_box_byte[30];
    p_box_permute[15] = s_box_byte[9];
    p_box_permute[16] = s_box_byte[1];
    p_box_permute[17] = s_box_byte[7];
    p_box_permute[18] = s_box_byte[23];
    p_box_permute[19] = s_box_byte[13];
    p_box_permute[20] = s_box_byte[31];
    p_box_permute[21] = s_box_byte[26];
    p_box_permute[22] = s_box_byte[2];
    p_box_permute[23] = s_box_byte[8];
    p_box_permute[24] = s_box_byte[18];
    p_box_permute[25] = s_box_byte[12];
    p_box_permute[26] = s_box_byte[29];
    p_box_permute[27] = s_box_byte[5];
    p_box_permute[28] = s_box_byte[21];
    p_box_permute[29] = s_box_byte[10];
    p_box_permute[30] = s_box_byte[3];
    p_box_permute[31] = s_box_byte[24];
    return p_box_permute;
}

fn finally_permute(end_byte: &[u32; 64]) -> [u32; 64] {
    let mut fp_byte = [0; 64];
    fp_byte[0] = end_byte[39];
    fp_byte[1] = end_byte[7];
    fp_byte[2] = end_byte[47];
    fp_byte[3] = end_byte[15];
    fp_byte[4] = end_byte[55];
    fp_byte[5] = end_byte[23];
    fp_byte[6] = end_byte[63];
    fp_byte[7] = end_byte[31];
    fp_byte[8] = end_byte[38];
    fp_byte[9] = end_byte[6];
    fp_byte[10] = end_byte[46];
    fp_byte[11] = end_byte[14];
    fp_byte[12] = end_byte[54];
    fp_byte[13] = end_byte[22];
    fp_byte[14] = end_byte[62];
    fp_byte[15] = end_byte[30];
    fp_byte[16] = end_byte[37];
    fp_byte[17] = end_byte[5];
    fp_byte[18] = end_byte[45];
    fp_byte[19] = end_byte[13];
    fp_byte[20] = end_byte[53];
    fp_byte[21] = end_byte[21];
    fp_byte[22] = end_byte[61];
    fp_byte[23] = end_byte[29];
    fp_byte[24] = end_byte[36];
    fp_byte[25] = end_byte[4];
    fp_byte[26] = end_byte[44];
    fp_byte[27] = end_byte[12];
    fp_byte[28] = end_byte[52];
    fp_byte[29] = end_byte[20];
    fp_byte[30] = end_byte[60];
    fp_byte[31] = end_byte[28];
    fp_byte[32] = end_byte[35];
    fp_byte[33] = end_byte[3];
    fp_byte[34] = end_byte[43];
    fp_byte[35] = end_byte[11];
    fp_byte[36] = end_byte[51];
    fp_byte[37] = end_byte[19];
    fp_byte[38] = end_byte[59];
    fp_byte[39] = end_byte[27];
    fp_byte[40] = end_byte[34];
    fp_byte[41] = end_byte[2];
    fp_byte[42] = end_byte[42];
    fp_byte[43] = end_byte[10];
    fp_byte[44] = end_byte[50];
    fp_byte[45] = end_byte[18];
    fp_byte[46] = end_byte[58];
    fp_byte[47] = end_byte[26];
    fp_byte[48] = end_byte[33];
    fp_byte[49] = end_byte[1];
    fp_byte[50] = end_byte[41];
    fp_byte[51] = end_byte[9];
    fp_byte[52] = end_byte[49];
    fp_byte[53] = end_byte[17];
    fp_byte[54] = end_byte[57];
    fp_byte[55] = end_byte[25];
    fp_byte[56] = end_byte[32];
    fp_byte[57] = end_byte[0];
    fp_byte[58] = end_byte[40];
    fp_byte[59] = end_byte[8];
    fp_byte[60] = end_byte[48];
    fp_byte[61] = end_byte[16];
    fp_byte[62] = end_byte[56];
    fp_byte[63] = end_byte[24];
    return fp_byte;
}

fn bt64_to_hex(byte_data: &[u32; 64]) -> String {
    let mut hex = String::with_capacity(16);
    for i in 0..16 {
        let mut bt = String::with_capacity(4);
        for j in 0..4 {
            bt.push_str(&byte_data[i * 4 + j].to_string());
        }
        hex.push(bt4_to_hex(&bt));
    }
    return hex;
}

fn bt4_to_hex(binary: &str) -> char {
    match binary {
        "0000" => '0',
        "0001" => '1',
        "0010" => '2',
        "0011" => '3',
        "0100" => '4',
        "0101" => '5',
        "0110" => '6',
        "0111" => '7',
        "1000" => '8',
        "1001" => '9',
        "1010" => 'A',
        "1011" => 'B',
        "1100" => 'C',
        "1101" => 'D',
        "1110" => 'E',
        "1111" => 'F',
        _ => '0',
    }
}
