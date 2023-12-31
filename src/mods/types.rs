use serde::{Deserialize, Serialize};
use std::{error::Error, fmt, fs::File, path::Path};

#[derive(Debug)]
pub enum PchError {
    InvalidUsername,
    InvalidPassword,
    UserNotFound,
    WrongPassword,
    PasswordMismatch,
    NetworkError,
    ParseError,
    OtherError(String),
}

impl Error for PchError {
    fn description(&self) -> &str {
        match self {
            Self::InvalidUsername => "invalid username",
            Self::InvalidPassword => "invalid password",
            Self::UserNotFound => "user not found",
            Self::WrongPassword => "wrong password",
            Self::PasswordMismatch => "password mismatch",
            Self::NetworkError => "network error",
            Self::ParseError => "parse error",
            Self::OtherError(_error) => "other error",
        }
    }
}

impl fmt::Display for PchError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Self::InvalidUsername => write!(f, "invalid username"),
            Self::InvalidPassword => write!(f, "invalid password"),
            Self::UserNotFound => write!(f, "user not found"),
            Self::WrongPassword => write!(f, "wrong password"),
            Self::PasswordMismatch => write!(f, "password mismatch"),
            Self::NetworkError => write!(f, "network error"),
            Self::ParseError => write!(f, "parse error"),
            Self::OtherError(error) => write!(f, "other error: {}", error),
        }
    }
}

impl From<()> for PchError {
    fn from(_: ()) -> Self {
        Self::OtherError("default error".to_owned())
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct PchConfig {
    pub port: u16,
    // pub username: String,
    // pub password: String,
    // pub user_agent: String,
    // pub proxy_url: String,
}

impl PchConfig {
    pub fn new<T: AsRef<Path>>(path: T) -> Result<Self, ()> {
        let mut file = if let Ok(value) = File::open(path) {
            value
        } else {
            println!("Error: cannot open config file");
            return Err(());
        };
        let config = if let Ok(value) = serde_json::from_reader(&mut file) {
            value
        } else {
            println!("Error: cannot parse config file");
            return Err(());
        };
        Ok(config)
    }
}
