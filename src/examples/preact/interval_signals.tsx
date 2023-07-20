/** @jsxImportSource preact */

import { effect, signal } from "@preact/signals";

export default function Preact() {
    const count = signal(0);

    effect(() => {
        const id = setInterval(() => {
            count.value++;
        }, 1000);

        return () => clearInterval(id);
    });

    return <span>{count}</span>;
}
