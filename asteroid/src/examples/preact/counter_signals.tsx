/** @jsxImportSource preact */

import { signal } from "@preact/signals";

export default function Preact() {
    const count = signal(0);

    const decrement = () => count.value--;
    const increment = () => count.value++;

    return (
        <>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
        </>
    );
}
