import type { APIRoute } from "astro";

const input = (excludeSwap?: boolean) => `
    <input
        ${!excludeSwap ? 'hx-swap-oob="true"' : ""}
        type="text"
        name="todoTypeScript"
        id="htmx-todo-main-input-typescript"
        hx-post="/htmx/typescript/todo"
        hx-target="#htmx-todo-parent-typescript"
        hx-swap="beforeend"
        hx-include="#htmx-todo-completed-input-typescript"
    />
`;

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

const todoitem = (
    text: string,
    completed: boolean,
    completedAmount?: number,
) => `
    ${completedAmount !== undefined ? completedCounter(completedAmount) : ""}
    ${completedAmount !== undefined ? input() : ""}
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

const container = (initial?: boolean) => `
    ${completedCounter(initial ? 1 : 0, true)}
    <div class="todo-header">
        ${input(true)}
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
    >${
        initial
            ? `
        ${todoitem("Learn web dev", true)}
        ${todoitem("Learn TypeScript", false)}
    `
            : ""
    }</ul>
`;

function parseNumber(value: string | undefined): number {
    const i = Number(value);
    return isNaN(i) ? 0 : i;
}

export const GET: APIRoute = async () => {
    return new Response(container(true), {
        headers: {
            "content-type": "text/html",
        },
    });
};

export const post: APIRoute = async ({ request, url }) => {
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
            todoitem(textQuery, isCompleted, newCompletedAmount),
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
