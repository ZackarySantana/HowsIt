/** @jsxImportSource solid-js */

import { For, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";

const getId = (todos) => {
    if (todos.length === 0) {
        return 0;
    }
    return todos[todos.length - 1].id + 1;
};
const addTodo = (setTodos, text, completed) =>
    setTodos(
        produce((todos) => {
            todos.push({ text, id: getId(todos), completed: completed });
        }),
    );
const addUncompletedTodo = (setTodos, text) => addTodo(setTodos, text, false);
const addCompletedTodo = (setTodos, text) => addTodo(setTodos, text, true);

const toggleTodo = (setTodos, index) =>
    setTodos(
        (todo) => index === todo.id,
        produce((todo) => (todo.completed = !todo.completed)),
    );

const deleteTodo = (setTodos, index) =>
    setTodos((todos) => todos.filter((todo) => todo.id !== index));

function TodoItem(props: {
    text: string;
    completed: boolean;
    toggle: () => void;
    delete_: () => void;
    test: () => void;
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

export default function Solid() {
    const [todos, setTodos] = createStore([]);

    const addUncompleted = (text) => () => addUncompletedTodo(setTodos, text);
    const addCompleted = (text) => () => addCompletedTodo(setTodos, text);
    const toggle = (index) => () => toggleTodo(setTodos, index);
    const delete_ = (index) => () => deleteTodo(setTodos, index);
    const clearTodos = () => () => setTodos([]);

    const addAction = () => (e) => {
        addUncompleted(e.target.value)();
        e.target.value = "";
    };

    onMount(() => {
        addCompleted("Learn web dev")();
        addUncompleted("Learn Solid")();
    });

    return (
        <div class="todo-container">
            <div class="todo-header">
                <input
                    type="text"
                    onChange={addAction()}
                />
                <button onClick={clearTodos()}>Clear</button>
            </div>
            <ul class="todo-parent">
                <For each={todos}>
                    {(todo, index) => (
                        <TodoItem
                            key={index}
                            text={todo.text}
                            completed={todo.completed}
                            toggle={toggle(index())}
                            delete_={delete_(index())}
                        />
                    )}
                </For>
            </ul>
        </div>
    );
}
