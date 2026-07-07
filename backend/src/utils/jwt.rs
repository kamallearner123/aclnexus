use jsonwebtoken::{
    encode,
    EncodingKey,
    Header,
};

use serde::{
    Serialize,
    Deserialize,
};

use chrono::{
    Utc,
    Duration,
};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {

    pub sub: String,

    pub exp: usize,
}

pub fn create_token(
    email: &str,
) -> String {

    let expiration =

        Utc::now()
            + Duration::hours(24);

    let claims = Claims {

        sub: email.to_string(),

        exp: expiration.timestamp() as usize,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(
            "projectpilot_secret".as_ref()
        ),
    )
    .unwrap()
}