/** @jsxImportSource solid-js */

import { onCleanup, createSignal } from "solid-js";

export default function () {
    const [count, setCount] = createSignal(0);

    const id = setInterval(() => {
        setCount((count) => count + 1);
    }, 1000);

    onCleanup(() => clearInterval(id));

    return <span style={{ color: "blue" }}>Solidjs {count()}</span>;
}
