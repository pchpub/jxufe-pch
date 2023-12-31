use std::error::Error;

use crate::mods::{client::types::JxufeClient, request::async_getwebpage};

pub async fn get_ws_xk_time_range(
    client: &mut JxufeClient,
    xktype: u32,
) -> Result<String, Box<dyn Error>> {
    let url = format!(
        "https://jwxt.jxufe.edu.cn/jw/common/getWsxkTimeRange.action?xktype={}",
        xktype
    );
    let resp = if let Ok(value) = async_getwebpage(&mut client.client, &url, None).await {
        value
    } else {
        return Err("async_getwebpage error".into());
    };

    Ok(match resp.1 {
        crate::mods::request::WebPageBody::Text(text) => text,
        crate::mods::request::WebPageBody::RawU8(_) => "".to_owned(),
    })
}
