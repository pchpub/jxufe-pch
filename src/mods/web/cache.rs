use std::path::Path;
use tokio::fs::File;
use tokio::io::{self, AsyncReadExt, AsyncWriteExt};

use crate::mods::request::WebPageBody;

pub async fn save_data<T: AsRef<Path>>(data: &WebPageBody, path: &T) -> io::Result<()> {
    let encoded: Vec<u8> = bincode::serialize(data).unwrap();
    let mut file = File::create(Path::new("./cache/").join(path.as_ref())).await?;
    file.write_all(&encoded).await?;
    Ok(())
}

pub async fn load_data<T: AsRef<Path>>(path: &T) -> io::Result<WebPageBody> {
    let mut file = File::open(Path::new("./cache/").join(path.as_ref())).await?;
    let mut contents = Vec::new();
    file.read_to_end(&mut contents).await?;
    let data: WebPageBody = bincode::deserialize(&contents[..]).unwrap();
    Ok(data)
}
