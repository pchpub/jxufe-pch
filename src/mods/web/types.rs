use std::collections::{hash_map::RandomState, HashMap};

use chashmap_async::{CHashMap, WriteGuard};
use serde::{Deserialize, Serialize};

use crate::mods::request::WebPageBody;

#[derive(Deserialize)]
pub struct Login {
    pub username: String,
    pub password: String,
}

#[derive(Serialize, Deserialize, Clone)]
pub enum ReqType {
    GET,
    POST,
    PUT,
    DELETE,
    HEAD,
    OPTIONS,
    CONNECT,
    PATCH,
    TRACE,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct SingleCache {
    pub path: String,
    pub timestamp: u64,
    pub status: u16,
    pub req_type: ReqType,
    pub headers: HashMap<String, String>,
    pub body: WebPageBody,
    pub content_type: String,
}

pub struct CacheList {
    // pub list: HashMap<String, SingleCache>,
    pub list: CHashMap<String, SingleCache>,
}

impl CacheList {
    pub fn new() -> Self {
        Self {
            list: CHashMap::new(),
        }
    }

    pub async fn add(&mut self, key: String, value: SingleCache) {
        self.list.insert(key, value).await;
    }

    pub async fn get(&self, key: &str) -> Option<SingleCache> {
        self.list.get(key).await.map(|guard| (*guard).clone())
    }

    pub async fn get_mut(
        &mut self,
        key: &str,
    ) -> Option<WriteGuard<'_, String, SingleCache, RandomState>> {
        self.list.get_mut(key).await
    }

    pub async fn remove(&mut self, key: &str) -> Option<SingleCache> {
        self.list.remove(key).await
    }

    pub async fn contains_key(&self, key: &str) -> bool {
        self.list.contains_key(key).await
    }

    pub fn len(&self) -> usize {
        self.list.len()
    }

    pub fn is_empty(&self) -> bool {
        self.list.is_empty()
    }

    pub async fn clear(&mut self) {
        self.list.clear().await;
    }

    pub async fn get_cache(&self, source: &str) -> WebPageBody {
        // let mut cache = self.get(source).unwrap().body.clone();
        // cache
        todo!("get_cache")
    }
}
