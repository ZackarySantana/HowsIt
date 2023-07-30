/** @jsxImportSource react */

import { useReducer, useEffect } from "react";

const ADD_TODO = "ADD_TODO";
const ADD_COMPLETED_TODO = "ADD_COMPLETED_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const CLEAR = "CLEAR";

const initialState = [];
const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, { text: action.text, completed: false }];
        case ADD_COMPLETED_TODO:
            return [...state, { text: action.text, completed: true }];
        case TOGGLE_TODO:
            return state.map((todo, index) =>
                index === action.index
                    ? { ...todo, completed: !todo.completed }
                    : todo,
            );
        case DELETE_TODO:
            return state.filter((todo, index) => index !== action.index);
        case CLEAR:
            return [];
        default:
            return state;
    }
};

function TodoItem(props: {
    text: string;
    completed: boolean;
    toggle: () => void;
    delete_: () => void;
}) {
    return (
        <li className="todo-item">
            <span className={props.completed ? "todo-completed" : ""}>
                {props.text}
            </span>
            <button onClick={props.toggle}>Toggle</button>
            <button onClick={props.delete_}>Delete</button>
        </li>
    );
}

export default function React() {
    const [todos, dispatch] = useReducer(reducer, initialState);

    const clearAction = () => dispatch({ type: CLEAR });
    const addAction = (e) => {
        if (e.key !== "Enter") {
            return;
        }
        dispatch({ type: ADD_TODO, text: e.target.value });
        e.target.value = "";
    };

    const toggleAction = (index) => () =>
        dispatch({ type: TOGGLE_TODO, index });
    const deleteAction = (index) => () =>
        dispatch({ type: DELETE_TODO, index });

    useEffect(() => {
        dispatch({ type: ADD_COMPLETED_TODO, text: "Learn web dev" });
        dispatch({ type: ADD_TODO, text: "Learn React" });
    }, []);

    return (
        <div className="todo-container">
            <div className="todo-header">
                <input
                    type="text"
                    onKeyUp={addAction}
                />
                <button onClick={clearAction}>Clear</button>
            </div>
            <ul className="todo-parent">
                {todos.map((todo, index) => (
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
