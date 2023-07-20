/** @jsxImportSource preact */

import { useState } from "preact/hooks";

export default function Preact() {
    const [count, setCount] = useState(0);

    const decrement = () => setCount(count - 1);
    const increment = () => setCount(count + 1);

    return (
        <>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
        </>
    );
}
