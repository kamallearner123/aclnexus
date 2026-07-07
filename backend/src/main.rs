mod routes;
mod models;
mod database;
mod utils;
mod middleware;

use axum::{
    Router,
    routing::post,
};

use routes::auth::{
    register,
    login,
    profile,
};

#[tokio::main]
async fn main() {

    dotenvy::dotenv().ok();

    let app = Router::new()
    .route("/register", post(register))
    .route("/login", post(login))
    .route("/profile", axum::routing::get(profile));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080")
        .await
        .unwrap();

    println!("Server running on port 8080");

    axum::serve(listener, app)
        .await
        .unwrap();
}