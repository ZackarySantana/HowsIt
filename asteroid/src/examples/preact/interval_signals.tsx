/** @jsxImportSource preact */

import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function Preact() {
    const count = signal(0);

    useEffect(() => {
        const id = setInterval(() => {
            count.value++;
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return <span>{count}</span>;
}
