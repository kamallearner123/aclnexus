use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CheckRole {
    pub email: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct AdminRequest {
    pub email: String,
}