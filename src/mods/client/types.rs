use crate::mods::{
    getinfo::{
        class_schedule::{get_data::get_class_schedule, types::ClassScheduleInfo},
        login::get_data::login,
    },
    request::{async_getwebpage, async_postwebpage},
    types::PchError,
};
use reqwest::header::HeaderMap;
use std::collections::HashMap;

use super::init_data::build_request;

pub struct JxufeClient {
    pub username: String,
    pub password: String,
    pub client: reqwest::Client,
    user_agent: String,
    proxy_url: String,
    cookie_map: HashMap<String, String>,
}

impl JxufeClient {
    pub fn new(
        username: &str,
        password: &str,
        cookie: &str,
        proxy_url: &str,
        user_agent: &str,
    ) -> Result<Self, &'static str> {
        let client = match build_request(cookie, user_agent, proxy_url) {
            Ok(value) => value,
            Err(value) => {
                return Err(value);
            }
        };

        Ok(Self {
            username: username.to_owned(),
            password: password.to_owned(),
            client,
            user_agent: user_agent.to_owned(),
            proxy_url: proxy_url.to_owned(),
            cookie_map: Self::cookie_str_to_map(cookie),
        })
    }

    pub fn set_cookie(&mut self, cookie: &str) {
        self.cookie_map = Self::cookie_str_to_map(cookie);
        Self::apply_cookie(self);
    }

    fn apply_cookie(&mut self) {
        self.client = match build_request(&self.cookie(), &self.user_agent, &self.proxy_url) {
            Ok(value) => value,
            Err(_) => {
                panic!("set cookie failed");
            }
        };
    }

    pub fn cookie(&self) -> String {
        Self::cookie_map_to_str(&self.cookie_map)
    }

    pub fn set_cookie_map(&mut self, cookie: &str) {
        self.cookie_map = Self::cookie_str_to_map(cookie);
    }

    fn cookie_str_to_map(cookie: &str) -> HashMap<String, String> {
        let mut cookie_map = HashMap::new();
        let cookie_list = cookie.split(";");
        for item in cookie_list {
            let cookie_item = item.trim().split("=").collect::<Vec<&str>>();
            if cookie_item.len() != 2 || cookie_item[0] == "Path" {
                continue;
            }
            cookie_map.insert(cookie_item[0].to_owned(), cookie_item[1].to_owned());
        }
        cookie_map
    }

    fn cookie_map_to_str(cookie_map: &HashMap<String, String>) -> String {
        let mut cookie_str = String::new();
        for (key, value) in cookie_map {
            cookie_str.push_str(&format!("{}={};", key, value));
        }
        cookie_str.pop();
        cookie_str
    }

    fn cookie_map_add(&mut self, key: &str, value: &str) {
        self.cookie_map.insert(key.to_owned(), value.to_owned());
    }

    // fn cookie_map_remove(&mut self, key: &str) {
    //     self.cookie_map.remove(key);
    // }

    pub fn cookie_map_get_single(&self, key: &str) -> Option<&str> {
        self.cookie_map.get(key).map(|value| value.as_str())
    }

    fn cookie_map_add_string(&mut self, cookie: &str) {
        let cookie_list = cookie.split(";");
        for item in cookie_list {
            let cookie_item = item.trim().split("=").collect::<Vec<&str>>();
            if cookie_item.len() != 2 || cookie_item[0] == "Path" {
                continue;
            }
            self.cookie_map_add(cookie_item[0], cookie_item[1]);
        }
    }

    pub fn check_login_info(&self) -> Result<(), PchError> {
        if self.username.len() == 0 {
            return Err(PchError::InvalidUsername);
        }
        if self.password.len() == 0 {
            return Err(PchError::InvalidPassword);
        }
        Ok(())
    }

    pub async fn async_getwebpage(
        &mut self,
        url: &str,
        headers: Option<HeaderMap>,
    ) -> Result<(HashMap<String, String>, String), ()> {
        let raw_data = async_getwebpage(&mut self.client, url, headers).await;
        match &raw_data {
            Ok(value) => {
                let (headers, _body) = value;
                if headers.contains_key("set-cookie") {
                    let cookie = headers.get("set-cookie").unwrap().as_str();
                    self.cookie_map_add_string(cookie);
                    Self::apply_cookie(self);
                }
            }
            Err(_) => (),
        }
        raw_data.map(|rst| match rst.1 {
            crate::mods::request::WebPageBody::Text(text) => (rst.0, text),
            crate::mods::request::WebPageBody::RawU8(_) => {
                println!("Error!!!!!!");
                (rst.0, "".to_owned())
            }
        })
    }

    pub async fn async_postwebpage(
        &mut self,
        url: &str,
        headers: Option<HeaderMap>,
        content: &str,
    ) -> Result<(HashMap<String, String>, String), ()> {
        let raw_data = async_postwebpage(&mut self.client, url, content.to_owned(), headers).await;
        match &raw_data {
            Ok(value) => {
                let (headers, _body) = value;
                if headers.contains_key("set-cookie") {
                    let cookie = headers.get("set-cookie").unwrap().as_str();
                    self.cookie_map_add_string(cookie);
                    Self::apply_cookie(self);
                }
            }
            Err(_) => (),
        }
        raw_data.map(|rst| match rst.1 {
            crate::mods::request::WebPageBody::Text(text) => (rst.0, text),
            crate::mods::request::WebPageBody::RawU8(_) => {
                println!("Error!!!!!!");
                (rst.0, "".to_owned())
            }
        })
    }

    pub async fn login(&mut self) -> Result<String, PchError> {
        login(self).await
    }

    pub async fn get_class_schedule(
        &mut self,
        year: &str,
        term: &str,
    ) -> Result<ClassScheduleInfo, PchError> {
        get_class_schedule(self, year, term).await
    }
}
