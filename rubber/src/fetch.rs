use actix_web::{get, HttpRequest, HttpResponse};
use rand::seq::SliceRandom;
use std::env;

fn get_api() -> String {
    return env::var("API_URL")
        .unwrap()
        .trim_end_matches("/")
        .to_string();
}

fn element(item: String) -> String {
    item
}

#[get("/htmx/rust/fetch")]
pub async fn get(_: HttpRequest) -> HttpResponse {
    let api = get_api();
    let resp = reqwest::get(&format!("{}/api/fetch", api))
        .await
        .unwrap()
        .text()
        .await
        .unwrap();

    let items: Vec<String> = serde_json::from_str(&resp).unwrap();
    let item = items.choose(&mut rand::thread_rng()).unwrap().to_string();

    return HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(element(item));
}
