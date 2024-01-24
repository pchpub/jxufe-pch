use std::path::Path;
use tokio::fs::File;
use tokio::io::{self, AsyncReadExt, AsyncWriteExt};

use crate::mods::request::WebPageBody;

pub async fn has_cache(source: &str) -> bool {
    let path = Path::new("./cache/").join(source);
    path.exists()
}

pub async fn get_cache(source: &str) -> Option<WebPageBody> {
    let path = Path::new("./cache/").join(source);
    if !path.exists() {
        return None;
    }
    load_data(&path).await.ok()
}

pub async fn save_cache(source: &str, data: &WebPageBody) -> io::Result<()> {
    let path = Path::new("./cache/").join(source);
    save_data(data, &path).await
}

async fn save_data<T: AsRef<Path>>(data: &WebPageBody, path: &T) -> io::Result<()> {
    let encoded: Vec<u8> = bincode::serialize(data).unwrap();
    let mut file = File::create(path.as_ref()).await?;
    file.write_all(&encoded).await?;
    Ok(())
}

async fn load_data<T: AsRef<Path>>(path: &T) -> io::Result<WebPageBody> {
    let mut file = File::open(path.as_ref()).await?;
    let mut contents = Vec::new();
    file.read_to_end(&mut contents).await?;
    let data: WebPageBody = bincode::deserialize(&contents[..]).unwrap();
    Ok(data)
}
