use base64::{prelude::BASE64_STANDARD, Engine};
use fancy_regex::Regex;
use html_parser::Dom;
use lazy_static::lazy_static;
use std::{collections::HashMap, error::Error};
use crate::mods::{client::types::JxufeClient, types::PchError};
use super::types::{ClassScheduleInfo, SingleClassSchedule};

pub async fn get_class_schedule(
    client: &mut JxufeClient,
    year: &str,
    term: &str,
) -> Result<ClassScheduleInfo, PchError> {
    let mut year = year.to_owned();
    let mut term = term.to_owned();
    let user_code = {
        let yeal_term = client
            .async_postwebpage(
                "https://jwxt.jxufe.edu.cn/jw/common/showYearTerm.action",
                None,
                "",
            )
            .await?;
        let yeal_term_json: serde_json::Value =
            if let Ok(value) = serde_json::from_str(&yeal_term.1) {
                value
            } else {
                return Err(PchError::ParseError);
            };
        let user_code = yeal_term_json["userCode"].as_str().unwrap_or("").to_owned();
        // if !year.is_empty() && !term.is_empty() {
        //     (user_code, year.to_owned(), term.to_owned())
        // } else {
        //     let year = yeal_term_json["xn"].as_str().unwrap_or("").to_owned();
        //     let term = yeal_term_json["xqM"].as_str().unwrap_or("").parse::<u8>().map(|i| i-1).unwrap_or(0).to_string();
        //     (user_code, year, term)
        // }
        user_code
    };

    let class_schedule_data = {
        let mut list_url: String = String::with_capacity(20);
        // let mut list_list_url: String = String::with_capacity(20);
        let mut chooser_box_name = String::with_capacity(10);
        {
            let url = "https://jwxt.jxufe.edu.cn/student/xkjg.wdkb.jsp?menucode=S20301";
            let raw_data = client.async_getwebpage(url, None).await?.1;
            let mut found_key_function_do_query = false;
            let mut found_key_function_init_page = false;
            for single_data in raw_data.split("\n") {
                if found_key_function_do_query {
                    if single_data
                        .trim_start()
                        .starts_with(r#"frmaction=$("cxfs_lb").checked?"#)
                    {
                        let urls: Vec<&str> = single_data.split(r#"""#).collect();
                        list_url = urls[3].to_owned().replace("..", "");
                        // list_list_url = urls[5].to_owned().replace("..", "");
                    }
                } else if single_data.trim_start().starts_with("function doQuery()") {
                    found_key_function_do_query = true;
                }

                if found_key_function_init_page {
                    if single_data
                        .trim_start()
                        .starts_with(r#"kutil.loadDropList4Single"#)
                    {
                        let urls: Vec<&str> = single_data.split(r#"""#).collect();
                        chooser_box_name = urls[3].to_owned();
                    }
                } else if single_data.trim_start().starts_with("function initPage()") {
                    found_key_function_init_page = true;
                }
            }
        }

        if year.is_empty() || term.is_empty() {
            let raw_data = client
                .async_postwebpage(
                    "https://jwxt.jxufe.edu.cn/frame/droplist/getDropLists.action",
                    None,
                    &format!("comboBoxName={chooser_box_name}&paramValue="),
                )
                .await?
                .1;
            let drop_list_json =
                if let Ok(value) = serde_json::from_str::<serde_json::Value>(&raw_data) {
                    value
                } else {
                    return Err(PchError::ParseError);
                };
            let mut drop_list_codes = Vec::with_capacity(10);
            for single_data in drop_list_json.as_array().unwrap() {
                drop_list_codes.push(single_data["code"].as_str().unwrap_or("").to_owned());
            }
            drop_list_codes.sort();
            drop_list_codes.reverse();
            let first_code = if let Some(value) = drop_list_codes.first() {
                value.to_owned()
            } else {
                return Err(PchError::ParseError);
            };
            let temp = first_code.split("-").collect::<Vec<&str>>();
            year = if let Some(value) = temp.get(0) {
                value.to_string()
            } else {
                return Err(PchError::ParseError);
            };
            term = if let Some(value) = temp.get(1) {
                value.to_string()
            } else {
                return Err(PchError::ParseError);
            };
        }

        let params = format!("xn={year}&xq={term}&xh={user_code}");
        let params = BASE64_STANDARD.encode(params);
        let url = format!("https://jwxt.jxufe.edu.cn{list_url}?params={params}");
        let raw_data = client.async_getwebpage(&url, None).await;
        if let Ok(value) = raw_data {
            value.1
        } else {
            return Err(PchError::NetworkError);
        }
    };

    let person_info = person_info_extract(&class_schedule_data)?;
    let class_info = if let Ok(value) = class_info_extract(&class_schedule_data) {
        value
    } else {
        return Err(PchError::ParseError);
    };

    Ok(ClassScheduleInfo::new(&person_info.0, &person_info.1, &person_info.2, &person_info.3, class_info))
}

fn person_info_extract(raw_data: &str) -> Result<(String, String, String, String), ()> {
    lazy_static! {
        static ref STUDENT_ID: Regex = Regex::new(r"学号：(?P<student_id>.*?)\s").unwrap();
        static ref STUDENT_NAME: Regex = Regex::new(r"姓名：(?P<student_name>.*?)\s").unwrap();
        static ref CLASS_NAME: Regex = Regex::new(r"所在班级：(?P<class_name>.*?)\s").unwrap();
        static ref CLASS_NUM: Regex = Regex::new(r"课程门数：(?P<class_num>.*?)&ensp;").unwrap();
    }

    let student_id = if let Some(value) = STUDENT_ID
        .captures(raw_data)
        .unwrap()
        .and_then(|cap| cap.name("student_id").map(|value| value.as_str()))
    {
        value.to_owned()
    } else {
        return Err(());
    };

    let student_name = if let Some(value) = STUDENT_NAME
        .captures(raw_data)
        .unwrap()
        .and_then(|cap| cap.name("student_name").map(|value| value.as_str()))
    {
        value.to_owned()
    } else {
        return Err(());
    };

    let class_name = if let Some(value) = CLASS_NAME
        .captures(raw_data)
        .unwrap()
        .and_then(|cap| cap.name("class_name").map(|value| value.as_str()))
    {
        value.to_owned()
    } else {
        return Err(());
    };

    let class_num = if let Some(value) = CLASS_NUM
        .captures(raw_data)
        .unwrap()
        .and_then(|cap| cap.name("class_num").map(|value| value.as_str()))
    {
        value.to_owned()
    } else {
        return Err(());
    };

    Ok((student_id, student_name, class_name, class_num))
}

fn class_info_extract(raw_data: &str) -> Result<Vec<SingleClassSchedule>, Box<dyn Error>> {
    let json_data = Dom::parse(raw_data)?.to_json()?;
    let jaon_data = serde_json::from_str::<serde_json::Value>(&json_data)?;

    let mut orders_map = HashMap::new();
    {
        let thread_info = &jaon_data["children"][1]["children"][1]["children"][2]["children"][0]
            ["children"][0]["children"];
        let mut orders = Vec::with_capacity(10);
        // order: 0: class_num, 1: class_name, 2: total_time, 3: credit, 4: nature, 5: teacher, 6: status, 7: textbook, 8: time_place, 9: remark
        for single_order in thread_info.as_array().unwrap() {
            let order: String = single_order["children"]
                .as_array()
                .unwrap()
                .iter()
                .map(|value| value.as_str().unwrap_or(""))
                .collect();
            match &order[..] {
                "上课班号" => orders.push(0),
                "课程" => orders.push(1),
                "总学时" => orders.push(2),
                "学分" => orders.push(3),
                "修读性质" => orders.push(4),
                "任课教师" => orders.push(5),
                "选课状态" => orders.push(6),
                "教材" => orders.push(7),
                "上课时间地点" => orders.push(8),
                "备注" => orders.push(9),
                _ => orders.push(233),
            }
        }

        for (index, value) in orders.iter().enumerate() {
            orders_map.insert(index, value.to_owned() as usize);
        }
    }


    let mut class_info = Vec::with_capacity(20);
    {
        let class_info_json =
            &jaon_data["children"][1]["children"][1]["children"][2]["children"][1]["children"];
        for single_class_info in class_info_json.as_array().unwrap() {
            let mut temp = Vec::with_capacity(orders_map.len());
            for _i in 0..orders_map.len() {
                temp.push("".to_owned());
            }
            let single_class_info = single_class_info["children"].as_array().unwrap();
            for (index, single_class_detail_info) in single_class_info.iter().enumerate() {
                let order = if let Some(value) = orders_map.get(&index) {
                    value
                } else {
                    continue;
                };
                
                if single_class_detail_info["children"].is_null() {
                    continue;
                }
                let value = single_class_detail_info["children"]
                    .as_array()
                    .unwrap()
                    .iter()
                    .map(|value| value.as_str().unwrap_or(""))
                    .collect::<String>();
                temp[orders_map[&order]] = value;
            }
            let mut single_class_detail_info = SingleClassSchedule::new();
            for (index, value) in temp.iter().enumerate() {
                match index {
                    0 => single_class_detail_info.class_num = value.to_owned(),
                    1 => single_class_detail_info.class_name = value.to_owned(),
                    2 => single_class_detail_info.total_time = value.to_owned(),
                    3 => single_class_detail_info.credit = value.to_owned(),
                    4 => single_class_detail_info.nature = value.to_owned(),
                    5 => single_class_detail_info.teacher = value.to_owned(),
                    6 => single_class_detail_info.status = value.to_owned(),
                    7 => single_class_detail_info.textbook = value.to_owned(),
                    8 => single_class_detail_info.time_place = value.to_owned(),
                    9 => single_class_detail_info.remark = value.to_owned(),
                    _ => (),
                }
            }
            class_info.push(single_class_detail_info);
        }
    }

    Ok(class_info)
}
