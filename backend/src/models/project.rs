use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateProject {
    pub company_id: i32,
    pub project_name: String,
    pub description: String,
    pub status: String,
}