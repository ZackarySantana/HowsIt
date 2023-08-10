/** @jsxImportSource solid-js */

import { createSignal, createEffect, createResource } from "solid-js";

function getData() {
    return fetch("/api/fetch").then((res) => res.json());
}

export default function Solid() {
    const [data] = createResource("", getData);
    const [currentItem, setCurrentItem] = createSignal("");

    const setRandom = () => {
        setCurrentItem(data()[Math.floor(Math.random() * data().length)]);
    };

    createEffect(() => {
        if (data.loading === false) {
            setRandom();
        }
    });

    return (
        <div className="fetch">
            <button onClick={setRandom}>New quote</button>
            <div>{currentItem()}</div>
        </div>
    );
}
