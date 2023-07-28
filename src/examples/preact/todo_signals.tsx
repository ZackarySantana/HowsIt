/** @jsxImportSource preact */

import { signal, effect } from "@preact/signals";
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

export default function Preact() {
    const todos = signal([{ text: "test", completed: false }]);

    const addTodo = (text, completed) =>
        (todos.value = [...todos.value, { text, completed }]);

    const toggleAction = (index) => () => {
        const todo = todos.value[index];
        todos.value[index] = { ...todo, completed: !todo.completed };
        todos.value = [...todos.value];
    };
    const clearAction = () => (todos.value = []);
    const deleteAction = (index) => () =>
        (todos.value = todos.value.splice(index, 1));

    const addAction = (e) => {
        console.log(todos.value);
        addTodo(e.target.value, false);
        e.target.value = "";
        console.log(todos.value);
    };

    useEffect(() => {
        addTodo("Learn web dev", true);
        addTodo("Learn Preact", false);
    }, []);

    effect(() => {
        console.log("effect", todos.value);
    });

    return (
        <div class="todo-container">
            <div class="todo-header">
                <input
                    type="text"
                    onChange={addAction}
                />
                <button onClick={clearAction}>Clear</button>
            </div>
            <ul class="todo-parent">
                {todos.value.map((todo, index) => (
                    <TodoItem
                        key={index}
                        text={todo.text}
                        completed={todo.completed}
                        toggle={toggleAction(index)}
                        delete_={deleteAction(index)}
                    />
                ))}
            </ul>
        </div>
    );
}
