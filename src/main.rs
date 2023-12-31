use std::{env, str::FromStr, time::Duration};

// use actix_files::Files;
use actix_web::{get, post, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use fancy_regex::Regex;
use jxufe_pch::mods::{
    client::types::JxufeClient,
    request::{async_getwebpage, async_postwebpage},
    types::PchConfig,
    web::types::Login,
};
use lazy_static::lazy_static;
use reqwest::Client;
use tokio::join;

lazy_static! {
    static ref RE1: Regex = Regex::new(r"https?://([^/]+)").unwrap();
    static ref RE2: Regex = Regex::new(r#"charset=([^\"]+)"#).unwrap();
}

async fn write_to_file(path: &str, data: &[u8]) -> std::io::Result<()> {
    use std::path::Path;
    use tokio::fs::{create_dir_all, File};
    use tokio::io::AsyncWriteExt;
    let path = Path::new(path);

    if let Some(parent) = path.parent() {
        if !parent.exists() {
            create_dir_all(parent).await?;
        }
    }

    let mut file = File::create(path).await?;
    file.write_all(data).await?;

    Ok(())
}

#[get("/login")]
async fn web_login(_req: HttpRequest) -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(include_str!("../static/login.html"))
}

#[post("/login")]
async fn web_login_post(req: HttpRequest, form: web::Form<Login>) -> impl Responder {
    // 在这里处理登录逻辑
    let user_agent = req
        .headers()
        .get("User-Agent")
        .map(|value| value.to_str().unwrap())
        .unwrap_or("Unknown");

    let user_name = form.username.clone();
    let password = form.password.clone();

    let mut client = match JxufeClient::new(&user_name, &password, "", "", &user_agent) {
        Ok(value) => value,
        Err(value) => {
            println!("[Error] {}", value);
            return HttpResponse::Forbidden()
                .body(format!("{{\"result_code\":403,\"reason\":\"{}\"}}", value));
        }
    };

    let sessionid = match client.login().await {
        Ok(value) => value,
        Err(value) => {
            println!("[Error] {}", value);
            return HttpResponse::Forbidden()
                .body(format!("{{\"result_code\":403,\"reason\":\"{}\"}}", value));
        }
    };

    HttpResponse::Ok()
        .append_header(("Set-Cookie", format!("JSESSIONID={}", sessionid)))
        .body(format!("{{\"result_code\":200,\"reason\":\"登陆成功\"}}"))
}

async fn web_default_proxy(req: HttpRequest, body: web::Bytes) -> HttpResponse {
    let base_url = "https://jwxt.jxufe.edu.cn";
    // 提取 URL
    let url = format!("{}{}", base_url, req.uri().to_string());
    // println!("url: {}", url);

    // 提取 Headers
    use reqwest::header::HeaderMap;
    use reqwest::header::HeaderName;
    use reqwest::header::HeaderValue;
    let mut headers = HeaderMap::new();
    for (key, value) in req.headers().iter() {
        if let Ok(header_name) = HeaderName::from_str(key.as_str()) {
            if let Ok(header_value) = HeaderValue::from_str(value.to_str().unwrap_or("")) {
                headers.insert(header_name, header_value);
            }
        }
    }

    // rewrite Referer
    if let Some(value) = headers.get_mut("Referer") {
        let current_referer_url = value.to_str().unwrap_or("");

        let new_referer_url: String = RE1.replace(current_referer_url, base_url).to_string();
        *value = HeaderValue::from_str(new_referer_url.as_str()).unwrap();
    }

    // remove host from headers
    headers.remove("Host");

    // 转发请求
    use actix_web::http::Method;
    let mut client = Client::builder()
        .timeout(Duration::from_secs(300)) // 设置 30 秒超时
        .build()
        .unwrap();
    match *req.method() {
        Method::GET => {
            let file_path = {
                // println!("Path: {}", req.uri().path());
                if req.uri().path() == "/" {
                    format!("./static/login.html")
                } else {
                    match req.uri().query() {
                        Some(value) => {
                            let query = jxufe_pch::mods::web::tools::remove_querys(
                                value,
                                &vec!["t", "random"],
                            )
                            .await;
                            if query.len() == 0 {
                                format!("./static{}", req.path())
                            } else {
                                format!("./static{}#{}", req.path(), query)
                            }
                        }
                        None => format!("./static{}", req.path()),
                    }
                }
            };
            match tokio::fs::metadata(&file_path).await {
                Ok(metadata) => {
                    if metadata.is_file() {
                        // 如果文件存在，读取文件内容
                        match tokio::fs::read(&file_path).await {
                            Ok(value) => {
                                return HttpResponse::Ok().body(value);
                            }
                            Err(_) => {
                                return HttpResponse::NotFound().body("File Not Found");
                            }
                        };
                    }
                }
                Err(_e) => (),
            }

            let (rsp_headers, rsp_body) =
                match async_getwebpage(&mut client, &url, Some(headers)).await {
                    Ok(value) => value,
                    Err(_) => {
                        return HttpResponse::GatewayTimeout().body("Gateway Timeout");
                    }
                };

            let mut rsp = HttpResponse::Ok();
            match rsp_body {
                jxufe_pch::mods::request::WebPageBody::Text(text) => {
                    let mut rsp_body = text;
                    for (key, value) in rsp_headers.iter() {
                        if let Ok(header_name) = HeaderName::from_str(key.as_str()) {
                            if let Ok(header_value) = HeaderValue::from_str(value) {
                                if key == "content-type" && value.starts_with("text/html") {
                                    rsp.append_header((header_name, "text/html;charset=UTF-8"));
                                    rsp_body = RE2.replace(&rsp_body, "charset=utf-8").to_string();
                                } else {
                                    rsp.append_header((header_name, header_value));
                                }
                            }
                        }
                    }
                    if !rsp_body.contains("温馨提示：凭证已失效，请重新登录!") {
                        write_to_file(&file_path, rsp_body.as_bytes())
                            .await
                            .unwrap();
                    }
                    rsp.body(rsp_body)
                }
                jxufe_pch::mods::request::WebPageBody::RawU8(value) => {
                    for (key, value) in rsp_headers.iter() {
                        if let Ok(header_name) = HeaderName::from_str(key.as_str()) {
                            if let Ok(header_value) = HeaderValue::from_str(value) {
                                rsp.append_header((header_name, header_value));
                            }
                        }
                    }
                    let rsp_body = value;

                    write_to_file(&file_path, &rsp_body).await.unwrap();
                    rsp.body(rsp_body)
                }
            }
        }
        Method::POST => {
            let content = body.to_vec();
            let (rsp_headers, rsp_body) =
                async_postwebpage(&mut client, &url, content, Some(headers))
                    .await
                    .unwrap();

            let mut rsp = HttpResponse::Ok();
            match rsp_body {
                jxufe_pch::mods::request::WebPageBody::Text(text) => {
                    let mut rsp_body = text;
                    for (key, value) in rsp_headers.iter() {
                        if let Ok(header_name) = HeaderName::from_str(key.as_str()) {
                            if let Ok(header_value) = HeaderValue::from_str(value) {
                                if key == "content-type" && value.starts_with("text/html") {
                                    rsp.append_header((header_name, "text/html;charset=UTF-8"));
                                    rsp_body = RE2.replace(&rsp_body, "charset=utf-8").to_string();
                                } else {
                                    rsp.append_header((header_name, header_value));
                                }
                            }
                        }
                    }
                    rsp.body(rsp_body)
                }
                jxufe_pch::mods::request::WebPageBody::RawU8(value) => {
                    for (key, value) in rsp_headers.iter() {
                        if let Ok(header_name) = HeaderName::from_str(key.as_str()) {
                            if let Ok(header_value) = HeaderValue::from_str(value) {
                                rsp.append_header((header_name, header_value));
                            }
                        }
                    }
                    let rsp_body = value;
                    rsp.body(rsp_body)
                }
            }
        }
        _ => HttpResponse::MethodNotAllowed().finish(),
    }
}

fn main() -> std::io::Result<()> {
    let rt = tokio::runtime::Runtime::new().unwrap();

    let args = env::args().collect::<Vec<String>>();
    let path = if args.len() > 1 {
        args[1].as_str()
    } else {
        "./config.toml"
    };

    let config = PchConfig::new(path).unwrap();

    let web_main = HttpServer::new(move || {
        App::new()
            .service(web_login)
            .service(web_login_post)
            .default_service(web::route().to(web_default_proxy))
    })
    .bind(("0.0.0.0", config.port))
    .unwrap()
    .keep_alive(Duration::from_secs(1200))
    .run();

    println!("Listen on: http://0.0.0.0:{}", config.port);

    rt.block_on(async { join!(web_main).0 })
}
