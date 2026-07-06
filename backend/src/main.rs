mod routes;
mod models;
mod database;

use axum::{
    Router,
    routing::post,
};

use routes::auth::{
    register,
    login,
};

#[tokio::main]
async fn main() {

    dotenvy::dotenv().ok();

    let app = Router::new()
    .route("/register", post(register))
    .route("/login", post(login));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080")
        .await
        .unwrap();

    println!("Server running on port 8080");

    axum::serve(listener, app)
        .await
        .unwrap();
}