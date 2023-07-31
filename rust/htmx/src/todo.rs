use actix_web::{delete, get, post, web, HttpRequest, HttpResponse};
use leptos::*;
use qstring::QString;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct TodoAddForm {
    todo_rust: Option<String>,
    todo_completed_amount_rust: String,
}

#[derive(Deserialize)]
pub struct TodoDeleteForm {
    todo_completed_amount_rust: Option<String>,
}

#[component]
fn Input(cx: Scope, exclude_swap: bool) -> impl IntoView {
    if exclude_swap {
        return view! { cx,
            <input
                type="text"
                name="todo_rust"
                id="htmx-todo-main-input-rust"
                hx-post="/htmx/rust/todo"
                hx-target="#htmx-todo-parent-rust"
                hx-swap="beforeend"
                hx-include="#htmx-todo-completed-input-rust"
            />
        };
    }

    view! { cx,
        <input
            type="text"
            name="todo_rust"
            id="htmx-todo-main-input-rust"
            hx-post="/htmx/rust/todo"
            hx-target="#htmx-todo-parent-rust"
            hx-swap="beforeend"
            hx-include="#htmx-todo-completed-input-rust"
            hx-swap-oob="true"
        />
    }
}

#[component]
fn CompletedCounter(cx: Scope, completed_amount: i32, exclude_swap: bool) -> impl IntoView {
    if exclude_swap {
        return view! { cx,
            <p
                {swap}
                id="htmx-todo-completed-rust"
            >
                "Completed: " {completed_amount}
            </p>
            <input
                type="hidden"
                name="todo_completed_amount_rust"
                id="htmx-todo-completed-input-rust"
                value=completed_amount
            />
        };
    }

    view! { cx,
        <p
            hx-swap-oob="true"
            id="htmx-todo-completed-rust"
        >
            "Completed: " {completed_amount}
        </p>
        <input
            type="hidden"
            name="todo_completed_amount_rust"
            id="htmx-todo-completed-input-rust"
            value=completed_amount
            hx-swap-oob="true"
        />
    }
}

fn completed_counter(completed_amount: i32, exclude_swap: bool) -> String {
    leptos::ssr::render_to_string(move |cx| {
        view! { cx,
            <CompletedCounter completed_amount=completed_amount exclude_swap=exclude_swap />
        }
    })
}

fn container() -> String {
    leptos::ssr::render_to_string(move |cx| {
        view! { cx,
            <CompletedCounter completed_amount=0 exclude_swap=true />
            <div class="todo-header">
                <Input exclude_swap=true />
                <button
                    hx-delete="/htmx/rust/todo?all"
                    hx-target="#htmx-todo-container-rust"
                >
                    "Clear"
                </button>
            </div>
            <ul
                class="todo-parent"
                id="htmx-todo-parent-rust"
            ></ul>
        }
    })
}

fn todo_item(text: String, completed: bool, completed_amount: i32) -> String {
    let toggle_path = "/htmx/rust/todo?toggle=".to_owned()
        + if completed { "off" } else { "on" }
        + "&text="
        + text.as_str();
    leptos::ssr::render_to_string(move |cx| {
        view! { cx,
            <CompletedCounter completed_amount=completed_amount exclude_swap=false />
            <Input exclude_swap=false />
            <li class="todo-item">
                <span {todo_completed}
                    class:todo-completed={move || completed}
                >{text}</span>
                <button
                    hx-post=toggle_path
                    hx-target="closest li"
                    hx-swap="outerHTML"
                    hx-include="#htmx-todo-completed-input-rust"
                >
                    "Toggle"
                </button>
                <button
                    hx-delete="/htmx/rust/todo".to_owned() + if completed { "?completed" } else { "" }
                    hx-target="closest li"
                    hx-swap="outerHTML"
                    hx-include="#htmx-todo-completed-input-rust"
                >
                    "Delete"
                </button>
            </li>
        }
    })
}

#[get("htmx/rust/todo")]
pub async fn get(_: HttpRequest) -> HttpResponse {
    return HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(container());
}

#[post("htmx/rust/todo")]
pub async fn post(_req: HttpRequest, info: web::Form<TodoAddForm>) -> HttpResponse {
    let completed_amount = info.todo_completed_amount_rust.parse::<i32>().unwrap();
    let query = QString::from(_req.query_string());
    let text = query.get("text").unwrap_or("");
    let completed = query.get("toggle").unwrap_or("") == "on";

    if text != "" {
        let new_completed_amount = if completed {
            completed_amount + 1
        } else {
            completed_amount - 1
        };

        return HttpResponse::Ok()
            .content_type("text/html; charset=utf-8")
            .body(todo_item(text.to_string(), completed, new_completed_amount));
    }

    let text = info.todo_rust.clone().unwrap_or("Error".to_string());

    return HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(todo_item(text, completed, completed_amount));
}

#[delete("htmx/rust/todo")]
pub async fn delete(_req: HttpRequest, info: web::Form<TodoDeleteForm>) -> HttpResponse {
    let query = QString::from(_req.query_string());
    let all = query.has("all");

    if all {
        return HttpResponse::Ok()
            .content_type("text/html; charset=utf-8")
            .body(container());
    }

    let completed_amount = info.todo_completed_amount_rust.as_ref().unwrap().parse::<i32>().unwrap();
    let completed = query.has("completed");

    let new_completed_amount = if completed {
        completed_amount - 1
    } else {
        completed_amount
    };

    return HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(completed_counter(new_completed_amount, false));
}
