import type { APIRoute } from "astro";

const completedCounter = (completedAmount: number, excludeSwap?: boolean) => `
    <p
        ${!excludeSwap ? 'hx-swap-oob="true"' : ""}
        id="htmx-todo-complete-typescript"
    >
        Completed: ${completedAmount} 
    </p>
    <input
        ${!excludeSwap ? 'hx-swap-oob="true"' : ""}
        type="hidden"
        name="todoCompletedAmountTypeScript"
        id="htmx-todo-completed-input-typescript"
        value="${completedAmount}"
    />
`;

const container = () => `
    ${completedCounter(0, true)}
    <div class="todo-header">
        <input
            type="text"
            name="todoTypeScript"
            hx-post="/htmx/typescript/todo"
            hx-target="#htmx-todo-parent-typescript"
            hx-swap="beforeend"
            hx-include="#htmx-todo-completed-input-typescript"
            hx-reset-on-success
        />
        <button
            hx-delete="/htmx/typescript/todo?all"
            hx-target="#htmx-todo-container-typescript"
        >
            Clear
        </button>
    </div>
    <ul
        class="todo-parent"
        id="htmx-todo-parent-typescript"
    ></ul>
`;

const todoitem = (
    text: string,
    completed: boolean,
    completedAmount: number,
) => `
    ${completedCounter(completedAmount)}
    <li class="todo-item">
        <span${completed ? ' class="todo-completed"' : ""}>${text}</span>
        <button
            hx-post="/htmx/typescript/todo?toggle=${
                completed ? "off" : "on"
            }&text=${encodeURIComponent(text)}"
            hx-target="closest li"
            hx-swap="outerHTML"
            hx-include="#htmx-todo-completed-input-typescript"
        >
            Toggle
        </button>
        <button
            hx-delete="/htmx/typescript/todo${completed ? "?completed" : ""}"
            hx-target="closest li"
            hx-swap="outerHTML"
            hx-include="#htmx-todo-completed-input-typescript"
        >
            Delete
        </button>
    </li>
`;

function parseNumber(value: string | undefined): number {
    const i = Number(value);
    return isNaN(i) ? 0 : i;
}

export const get: APIRoute = async () => {
    console.log("GET");
    return new Response(container(0), {
        headers: {
            "content-type": "text/html",
        },
    });
};

export const post: APIRoute = async ({ request, url }) => {
    console.log("POST");
    const formData = await request.formData();
    const completedAmount = parseNumber(
        formData.get("todoCompletedAmountTypeScript")?.toString(),
    );
    const textQuery = url.searchParams.get("text") ?? "";
    const completedQuery = url.searchParams.get("toggle") ?? "";

    if (textQuery !== "" && completedQuery !== "") {
        const isCompleted = completedQuery === "on";
        const newCompletedAmount = completedAmount + (isCompleted ? 1 : -1);

        return new Response(
            todoItem(textQuery, isCompleted, newCompletedAmount),
            {
                headers: {
                    "content-type": "text/html",
                },
            },
        );
    }

    const item = todoitem(
        formData.get("todoTypeScript")?.toString() ?? "Error",
        false,
        completedAmount,
    );

    return new Response(item, {
        headers: {
            "content-type": "text/html",
        },
    });
};

export const del: APIRoute = async ({ request, url }) => {
    console.log("DEL");
    const deleteAll = url.searchParams.get("all") !== null;

    if (deleteAll) {
        return new Response(container(), {
            headers: {
                "content-type": "text/html",
            },
        });
    }

    const formData = await request.formData();
    const completedAmount = parseNumber(
        formData.get("todoCompletedAmountTypeScript")?.toString(),
    );
    const deletingCompleted = url.searchParams.get("completed") !== null;
    const newCompletedAmount = completedAmount + (deletingCompleted ? -1 : 0);

    return new Response(completedCounter(newCompletedAmount), {
        headers: {
            "content-type": "text/html",
        },
    });
};
