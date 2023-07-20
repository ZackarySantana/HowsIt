use actix_web::{middleware, App, HttpServer};
use log::info;
mod counter;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

    info!("starting http server at http://localhost:3001");

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .service(counter::post)
            .service(counter::get)
    })
    .bind(("127.0.0.1", 3001))?
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
