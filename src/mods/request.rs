use reqwest::{header::HeaderMap, Client};
use std::{collections::HashMap, io::Cursor};

pub enum WebPageBody {
    Text(String),
    RawU8(Vec<u8>),
}

pub async fn async_getwebpage(
    raw_client: &mut Client,
    url: &str,
    headers: Option<HeaderMap>,
) -> Result<(HashMap<String, String>, WebPageBody), ()> {
    println!("GET: {}", url);

    let mut retry_count = 0;
    let max_retries = 3;

    while retry_count < max_retries {
        let mut client = raw_client.get(url);
        if let Some(value) = headers.clone() {
            client = client.headers(value)
        }

        let rsp_raw_data = match client.send().await {
            Ok(value) => value,
            Err(_) => {
                retry_count += 1;
                if retry_count >= max_retries {
                    return Err(());
                }
                continue;
            }
        };

        match rsp_raw_data.status().as_u16() {
            404 | 429 => return Err(()),
            _ => (),
        }
        let rsp_headers: HashMap<String, String> = rsp_raw_data
            .headers()
            .iter()
            .map(|(k, v)| (k.as_str().to_owned(), v.to_str().unwrap_or("").to_owned()))
            .collect();

        let rsp_bytes = if let Ok(value) = rsp_raw_data.bytes().await {
            value
        } else {
            return Err(());
        }
        .to_vec();

        let default_string = "".to_owned();

        let content_type: &str = rsp_headers
            .get("content-type")
            .unwrap_or(&default_string)
            .split(";")
            .collect::<Vec<_>>()
            .get(0)
            .unwrap_or(&"");

        println!("{}", content_type);

        let is_text: bool = match content_type {
            "text/html"
            | "application/json"
            | "application/javascript"
            | "text/javascript"
            | "text/plain"
            | "text/css" => true,
            _ => false,
        };

        let rsp_body = if is_text {
            use chardetng::EncodingDetector;
            let mut detector = EncodingDetector::new();
            detector.feed(&rsp_bytes, true);
            let encoding = detector.guess(None, true);

            // println!("Detected encoding: {}", encoding.name());

            use encoding_rs_io::DecodeReaderBytesBuilder;
            use std::io::Read;

            let cursor = Cursor::new(rsp_bytes);

            let mut decoder = {
                match encoding.name() {
                    "GBK" => DecodeReaderBytesBuilder::new()
                        .encoding(Some(encoding_rs::GBK))
                        .build(cursor),
                    "windows-1252" => DecodeReaderBytesBuilder::new()
                        .encoding(Some(encoding_rs::WINDOWS_1252))
                        .build(cursor),
                    "UTF-8" => DecodeReaderBytesBuilder::new()
                        .encoding(Some(encoding_rs::UTF_8))
                        .build(cursor),
                    _ => {
                        println!("Unknown encoding: {}", encoding.name());
                        DecodeReaderBytesBuilder::new()
                            .encoding(Some(encoding_rs::UTF_8))
                            .build(cursor)
                    }
                }
            };
            let mut rsp_body = String::new();
            decoder.read_to_string(&mut rsp_body).map_err(|_| ())?;
            WebPageBody::Text(rsp_body)
        } else {
            WebPageBody::RawU8(rsp_bytes)
        };

        return Ok((rsp_headers, rsp_body));
    }
    return Err(());
}

pub async fn async_postwebpage<T: Into<reqwest::Body> + Clone>(
    client: &mut Client,
    url: &str,
    content: T,
    headers: Option<HeaderMap>,
) -> Result<(HashMap<String, String>, WebPageBody), ()> {
    println!("POST: {}", url);

    let mut retry_count = 0;
    let max_retries = 3;

    while retry_count < max_retries {
        let mut client = client.post(url).body(content.clone().into());
        if let Some(value) = headers.clone() {
            client = client.headers(value);
        }

        let rsp_raw_data = match client.send().await {
            Ok(value) => value,
            Err(_) => {
                retry_count += 1;
                if retry_count >= max_retries {
                    return Err(());
                }
                continue;
            }
        };

        match rsp_raw_data.status().as_u16() {
            404 | 429 => return Err(()),
            _ => (),
        }
        let rsp_headers: HashMap<String, String> = rsp_raw_data
            .headers()
            .iter()
            .map(|(k, v)| (k.as_str().to_owned(), v.to_str().unwrap_or("").to_owned()))
            .collect();

        let rsp_bytes = if let Ok(value) = rsp_raw_data.bytes().await {
            value
        } else {
            return Err(());
        }
        .to_vec();

        let default_string = "".to_owned();

        let content_type: &str = rsp_headers
            .get("content-type")
            .unwrap_or(&default_string)
            .split(";")
            .collect::<Vec<_>>()
            .get(0)
            .unwrap_or(&"");

        println!("{}", content_type);

        let is_text: bool = match content_type {
            "text/html"
            | "application/json"
            | "application/javascript"
            | "text/javascript"
            | "text/plain"
            | "text/css" => true,
            _ => false,
        };

        let rsp_body = if is_text {
            use chardetng::EncodingDetector;
            let mut detector = EncodingDetector::new();
            detector.feed(&rsp_bytes, true);
            let encoding = detector.guess(None, true);

            // println!("Detected encoding: {}", encoding.name());

            use encoding_rs_io::DecodeReaderBytesBuilder;
            use std::io::Read;

            let cursor = Cursor::new(rsp_bytes);

            let mut decoder = {
                match encoding.name() {
                    "GBK" => DecodeReaderBytesBuilder::new()
                        .encoding(Some(encoding_rs::GBK))
                        .build(cursor),
                    "windows-1252" => DecodeReaderBytesBuilder::new()
                        .encoding(Some(encoding_rs::WINDOWS_1252))
                        .build(cursor),
                    "UTF-8" => DecodeReaderBytesBuilder::new()
                        .encoding(Some(encoding_rs::UTF_8))
                        .build(cursor),
                    _ => DecodeReaderBytesBuilder::new()
                        .encoding(Some(encoding_rs::UTF_8))
                        .build(cursor),
                }
            };
            let mut rsp_body = String::new();
            decoder.read_to_string(&mut rsp_body).map_err(|_| ())?;
            WebPageBody::Text(rsp_body)
        } else {
            WebPageBody::RawU8(rsp_bytes)
        };

        return Ok((rsp_headers, rsp_body));
    }
    return Err(());
}
