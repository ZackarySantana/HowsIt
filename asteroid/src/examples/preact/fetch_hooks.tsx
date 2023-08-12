/** @jsxImportSource preact */

import { useEffect, useState } from "preact/hooks";

export default function Preact() {
    const [currentItem, setCurrentItem] = useState("");
    const [delta, setDelta] = useState(0);

    const setRandom = async () => {
        const tick = new Date().getTime();
        const data = await fetch("/api/fetch").then((r) => r.json());
        setCurrentItem(data[Math.floor(Math.random() * data.length)]);
        setDelta(new Date().getTime() - tick);
    };

    useEffect(() => {
        setRandom();
    }, [setCurrentItem]);

    return (
        <div className="fetch">
            <button onClick={setRandom}>New quote</button>
            <p>{delta}ms</p>
            <div>{currentItem}</div>
        </div>
    );
}
