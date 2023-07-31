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
fn Input(cx: Scope) -> impl IntoView {
    view! { cx,
        <input
            type="text"
            name="todo_rust"
            id="htmx-todo-main-input-rust"
            hx-post="/htmx/rust/todo"
            hx-target="#htmx-todo-parent-rust"
            hx-swap="beforeend"
            hx-include="#htmx-todo-completed-input-rust"
        />
    }
}

#[component]
fn InputSwap(cx: Scope) -> impl IntoView {
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
fn CompletedCounter(cx: Scope, completed_amount: i32) -> impl IntoView {
    view! { cx,
        <p id="htmx-todo-completed-rust">
            "Completed: " {completed_amount}
        </p>
        <input
            type="hidden"
            name="todo_completed_amount_rust"
            id="htmx-todo-completed-input-rust"
            value=completed_amount
        />
    }
}

#[component]
fn CompletedCounterSwap(cx: Scope, completed_amount: i32) -> impl IntoView {
    view! { cx,
        <p
            id="htmx-todo-completed-rust"
            hx-swap-oob="true"
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
    if exclude_swap {
        return leptos::ssr::render_to_string(move |cx| {
            view! { cx,
                <CompletedCounter completed_amount=completed_amount />
            }
        });
    }
    leptos::ssr::render_to_string(move |cx| {
        view! { cx,
            <CompletedCounterSwap completed_amount=completed_amount  />
        }
    })
}

#[component]
fn TodoItem(cx: Scope, text: String, completed: bool) -> impl IntoView {
    let toggle_path = "/htmx/rust/todo?toggle=".to_owned()
        + if completed { "off" } else { "on" }
        + "&text="
        + text.as_str();
    let delete_path = "/htmx/rust/todo".to_owned() + if completed { "?completed" } else { "" };
    view! { cx,
        <li class="todo-item">
            <span class:todo-completed={move || completed}>
                {text}
            </span>
            <button
                hx-post=toggle_path
                hx-target="closest li"
                hx-swap="outerHTML"
                hx-include="#htmx-todo-completed-input-rust"
            >
                "Toggle"
            </button>
            <button
                hx-delete=delete_path
                hx-target="closest li"
                hx-swap="outerHTML"
                hx-include="#htmx-todo-completed-input-rust"
            >
                "Delete"
            </button>
        </li>
    }
}

#[component]
fn TodoItemSwap(cx: Scope, text: String, completed: bool, completed_amount: i32) -> impl IntoView {
    let toggle_path = "/htmx/rust/todo?toggle=".to_owned()
        + if completed { "off" } else { "on" }
        + "&text="
        + text.as_str();
    let delete_path = "/htmx/rust/todo".to_owned() + if completed { "?completed" } else { "" };
    view! { cx,
        <CompletedCounterSwap completed_amount=completed_amount />
        <InputSwap />
        <li class="todo-item">
            <span class:todo-completed={move || completed}>
                {text}
            </span>
            <button
                hx-post=toggle_path
                hx-target="closest li"
                hx-swap="outerHTML"
                hx-include="#htmx-todo-completed-input-rust"
            >
                "Toggle"
            </button>
            <button
                hx-delete=delete_path
                hx-target="closest li"
                hx-swap="outerHTML"
                hx-include="#htmx-todo-completed-input-rust"
            >
                "Delete"
            </button>
        </li>
    }
}

fn todo_item(text: String, completed: bool, completed_amount: i32) -> String {
    leptos::ssr::render_to_string(move |cx| {
        view! { cx,
            <TodoItemSwap text=text completed=completed completed_amount=completed_amount />
        }
    })
}

fn container_initial() -> String {
    leptos::ssr::render_to_string(move |cx| {
        view! { cx,
            <CompletedCounter completed_amount=1 />
            <div class="todo-header">
                <Input />
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
            >
                <TodoItem text="Learn web dev".to_string() completed=true />
                <TodoItem text="Hello".to_string() completed=false />
            </ul>
        }
    })
}

fn container() -> String {
    leptos::ssr::render_to_string(move |cx| {
        view! { cx,
            <CompletedCounter completed_amount=0 />
            <div class="todo-header">
                <Input />
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

#[get("htmx/rust/todo")]
pub async fn get(_: HttpRequest) -> HttpResponse {
    return HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(container_initial());
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

    let completed_amount = info
        .todo_completed_amount_rust
        .as_ref()
        .unwrap()
        .parse::<i32>()
        .unwrap();
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
