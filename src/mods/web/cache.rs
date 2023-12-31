use tokio::fs::File;
use tokio::io::{self, AsyncReadExt, AsyncWriteExt};

use crate::mods::request::WebPageBody;

pub async fn save_data(data: &WebPageBody) -> io::Result<()> {
    let encoded: Vec<u8> = bincode::serialize(data).unwrap();
    let mut file = File::create("data.bin").await?;
    file.write_all(&encoded).await?;
    Ok(())
}

pub async fn load_data() -> io::Result<WebPageBody> {
    let mut file = File::open("data.bin").await?;
    let mut contents = Vec::new();
    file.read_to_end(&mut contents).await?;
    let data: WebPageBody = bincode::deserialize(&contents[..]).unwrap();
    Ok(data)
}
