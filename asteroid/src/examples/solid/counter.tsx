/** @jsxImportSource solid-js */

import { createSignal } from "solid-js";

export default function Solid() {
    const [count, setCount] = createSignal(0);

    const decrement = () => setCount(count() - 1);
    const increment = () => setCount(count() + 1);

    return (
        <>
            <button onClick={decrement}>-</button>
            <span>{count()}</span>
            <button onClick={increment}>+</button>
        </>
    );
}
