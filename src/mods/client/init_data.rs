use std::time::Duration;

use rand::Rng;
use reqwest::{header::HeaderValue, Client};

pub fn build_request(
    cookie: &str,
    user_agent: &str,
    proxy_url: &str,
) -> Result<Client, &'static str> {
    let mut client_builder = reqwest::Client::builder().timeout(Duration::from_secs(300));
    if proxy_url.len() != 0 {
        client_builder = client_builder.proxy(if proxy_url.contains("://") {
            if let Ok(value) = reqwest::Proxy::all(proxy_url) {
                value
            } else {
                return Err("unknown proxy url");
            }
        } else {
            if let Ok(value) = reqwest::Proxy::all(format!("socks5://{}", proxy_url)) {
                value
            } else {
                return Err("unknown proxy url");
            }
        });
    }

    let mut default_headers = reqwest::header::HeaderMap::new();
    default_headers.insert("Accept-Encoding", "gzip, deflate, br".parse().unwrap());
    default_headers.insert(
        "Accept",
        HeaderValue::from_static("text/plain, */*; q=0.01"),
    );
    default_headers.insert("Accept-Language", HeaderValue::from_static("zh-TH,zh;q=0.9,en-TH;q=0.8,en;q=0.7,th-TH;q=0.6,th;q=0.5,zh-SG;q=0.4,ja-JP;q=0.3,ja;q=0.2,zh-CN;q=0.1"));
    default_headers.insert(
        "Content-Type",
        HeaderValue::from_static("application/x-www-form-urlencoded; charset=UTF-8"),
    );
    default_headers.insert(
        "Origin",
        HeaderValue::from_static("https://jwxt.jxufe.edu.cn"),
    );
    default_headers.insert(
        "sec-ch-ua",
        HeaderValue::from_static(
            r#""Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99""#,
        ),
    );
    default_headers.insert("sec-ch-ua-mobile", HeaderValue::from_static("?0"));
    default_headers.insert(
        "sec-ch-ua-platform",
        HeaderValue::from_static(r#""Windows""#),
    );
    default_headers.insert("sec-fetch-dest", HeaderValue::from_static("empty"));
    default_headers.insert("sec-fetch-mode", HeaderValue::from_static("cors"));
    default_headers.insert("sec-fetch-site", HeaderValue::from_static("same-origin"));
    default_headers.insert("User-Agent", HeaderValue::from_str(&user_agent).unwrap());
    default_headers.insert(
        "Referer",
        HeaderValue::from_static("https://jwxt.jxufe.edu.cn/"),
    );
    default_headers.insert(
        "X-Requested-With",
        HeaderValue::from_static("XMLHttpRequest"),
    );
    if !cookie.is_empty() {
        default_headers.insert("Cookie", cookie.parse().unwrap());
    }

    let client = if let Ok(value) = client_builder
        .brotli(true)
        .gzip(true)
        .deflate(true)
        .timeout(Duration::from_secs(20))
        .default_headers(default_headers)
        .user_agent({
            if user_agent.is_empty() {
                get_random_useragent()
            } else {
                user_agent.to_owned()
            }
        })
        .http1_title_case_headers()
        .build()
    {
        value
    } else {
        return Err("build client failed");
    };

    Ok(client)
}

fn get_random_useragent() -> String {
    let useragents = vec![
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0	Firefox 90.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
    ];
    let mut rng = rand::thread_rng();
    let index = rng.gen_range(0..useragents.len());
    useragents[index].to_string()
}
