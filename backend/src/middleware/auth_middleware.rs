use jsonwebtoken::{
    decode,
    DecodingKey,
    Validation,
};

use serde::{
    Serialize,
    Deserialize,
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

pub fn verify_token(
    token: &str,
) -> Option<String> {

    let result = decode::<Claims>(
        token,
        &DecodingKey::from_secret(
            "projectpilot_secret".as_ref()
        ),
        &Validation::default(),
    );

    match result {
        Ok(data) => Some(data.claims.sub),
        Err(_) => None,
    }
}