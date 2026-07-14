use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct RegisterUser {
    pub company_id: i32,
    pub role_id: i32,
    pub name: String,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginUser {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ResetPassword {
    pub email: String,
    pub password: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ChangePassword {
    pub email: String,
    pub password: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct SendOtp {
    pub email: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct VerifyOtp {
    pub email: String,
    pub otp: String,
}