use actix_web::{get, HttpRequest, HttpResponse};
use rand::seq::SliceRandom;
use std::env;

fn element(item: String) -> String {
    item
}

#[get("/htmx/rust/fetch")]
pub async fn get(_: HttpRequest) -> HttpResponse {
    let api = env::var("API_URL").unwrap();
    let api = api.trim_end_matches("/");
    let resp = reqwest::get(&format!("{}/api/fetch", api))
        .await
        .unwrap()
        .text()
        .await
        .unwrap();
    let items = resp
        .trim_start_matches('[')
        .trim_end_matches(']')
        .split("\",\"")
        .map(|s| s.to_string())
        .collect::<Vec<String>>();
    let item = items.choose(&mut rand::thread_rng()).unwrap().to_string();
    return HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(element(item));
}
