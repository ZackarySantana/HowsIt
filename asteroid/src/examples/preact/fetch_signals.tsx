/** @jsxImportSource preact */

import { signal, effect } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function Preact() {
    const data = signal(0);
    const currentItem = signal("");

    const setRandom = () => {
        currentItem.value =
            data.value[Math.floor(Math.random() * data.value.length)];
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
                <div>{currentItem}</div>
            </div>
        </>
    );
}
