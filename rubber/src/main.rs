use actix_web::{middleware, web, App, HttpResponse, HttpServer, Result};
use dotenv::dotenv;
use log::info;
use std::env;
mod counter;
mod fetch;
mod interval;
mod todo;

async fn health() -> Result<HttpResponse> {
    Ok(HttpResponse::Ok().json(serde_json::json!({
        "status": "ok",
        "service": "rubber"
    })))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

    let port = env::var("PORT").unwrap_or_else(|_| "3001".to_string());
    let addr = format!("[::]:{}", port);
    
    info!("starting http server at http://{}", addr);

    let socket_addr = addr.parse::<std::net::SocketAddr>().unwrap();

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .route("/", web::get().to(health))
            .service(counter::post)
            .service(counter::get)
            .service(interval::post)
            .service(interval::get)
            .service(todo::get)
            .service(todo::post)
            .service(todo::delete)
            .service(fetch::get)
    })
    .bind(socket_addr)?
    .run()
    .await
}

// #[tokio::main]
// async fn main() {
//     env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

//     let app = Router::new().route("/counter", get(counter::index));

//     let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
//     axum::serve(listener, app).await.unwrap();
// }