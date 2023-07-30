/** @jsxImportSource preact */

import { signal, computed } from "@preact/signals";
import { useEffect } from "preact/hooks";

function TodoItem(props: {
    text: string;
    completed: boolean;
    toggle: () => void;
    delete_: () => void;
}) {
    return (
        <li class="todo-item">
            <span class={props.completed ? "todo-completed" : ""}>
                {props.text}
            </span>
            <button onClick={props.toggle}>Toggle</button>
            <button onClick={props.delete_}>Delete</button>
        </li>
    );
}

function Todos(props: {
    todos: {
        value: { text: string; completed: boolean };
        toggle: (i: number) => () => void;
        delete_: (index) => () => void;
    }[];
}) {
    return (
        <ul class="todo-parent">
            {props.todos.value.map((todo, index) => (
                <TodoItem
                    key={index}
                    text={todo.text}
                    completed={todo.completed}
                    toggle={props.toggle(index)}
                    delete_={props.delete_(index)}
                />
            ))}
        </ul>
    );
}

export default function Preact() {
    const todos = signal([]);
    const completedamount = computed(() => todos.value.filter((todo) => todo.completed).length);

    const addTodo = (text, completed) =>
        (todos.value = [...todos.value, { text, completed }]);

    const toggleAction = (index) => () => {
        const todo = todos.value[index];
        todos.value[index] = { ...todo, completed: !todo.completed };
        todos.value = [...todos.value];
    };
    const clearAction = () => (todos.value = []);
    const deleteAction = (index) => () =>
        (todos.value = todos.value.filter((_, i) => i !== index));

    const addAction = (e) => {
        addTodo(e.target.value, false);
        e.target.value = "";
    };

    useEffect(() => {
        addTodo("Learn web dev", true);
        addTodo("Learn Preact", false);
    }, []);

    return (
        <div class="todo-container">
            <p>Completed: {completedamount}</p>
            <div class="todo-header">
                <input
                    type="text"
                    onChange={addAction}
                />
                <button onClick={clearAction}>Clear</button>
            </div>
            <ul class="todo-parent">
                <Todos
                    todos={todos}
                    toggle={toggleAction}
                    delete_={deleteAction}
                />
            </ul>
        </div>
    );
}
