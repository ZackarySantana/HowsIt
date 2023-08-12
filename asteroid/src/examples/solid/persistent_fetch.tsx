/** @jsxImportSource solid-js */

import { createEffect, createResource, createSignal } from "solid-js";

function getData() {
    return fetch("/api/fetch").then((res) => res.json());
}

export default function Solid() {
    const [data] = createResource("", getData);
    const [currentItem, setCurrentItem] = createSignal("");
    const [delta, setDelta] = createSignal(0);

    const setRandom = () => {
        const tick = new Date().getTime();
        setCurrentItem(data()[Math.floor(Math.random() * data().length)]);
        setDelta(new Date().getTime() - tick);
    };

    createEffect(() => {
        if (data.loading === false) {
            setRandom();
        }
    });

    return (
        <div class="fetch">
            <button onClick={setRandom}>New quote</button>
            <p>{delta()}ms</p>
            <div>{currentItem()}</div>
        </div>
    );
}
