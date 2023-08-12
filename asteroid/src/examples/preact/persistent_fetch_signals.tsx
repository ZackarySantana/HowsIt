/** @jsxImportSource preact */

import { effect, signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function Preact() {
    const data = signal([]);
    const currentItem = signal("");
    const delta = signal(0);

    const setRandom = () => {
        const tick = new Date().getTime();
        currentItem.value =
            data.value[Math.floor(Math.random() * data.value.length)];
        delta.value = new Date().getTime() - tick;
    };

    useEffect(() => {
        fetch("/api/fetch")
            .then((r) => r.json())
            .then((d) => (data.value = d));
    }, []);

    effect(() => {
        if (data.value.length > 0) {
            setRandom();
        }
    });

    return (
        <>
            <div className="fetch">
                <button onClick={setRandom}>New quote</button>
                <p>{delta}ms</p>
                <div>{currentItem}</div>
            </div>
        </>
    );
}
