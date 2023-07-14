/** @jsxImportSource solid-js */

import { createSignal, onCleanup } from "solid-js";

export default function Solid() {
    const [count, setCount] = createSignal(0);

    const id = setInterval(() => {
        setCount((count) => count + 1);
    }, 1000);

    onCleanup(() => clearInterval(id));

    return <span style={{ color: "lightblue" }}>{count()}</span>;
}
