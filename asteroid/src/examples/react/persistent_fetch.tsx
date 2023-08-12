/** @jsxImportSource react */

import { useEffect, useState } from "react";

export default function React() {
    const [data, setData] = useState([]);
    const [currentItem, setCurrentItem] = useState("");
    const [delta, setDelta] = useState(0);

    const setRandom = () => {
        const tick = new Date().getTime();
        setCurrentItem(data[Math.floor(Math.random() * data.length)]);
        setDelta(new Date().getTime() - tick);
    };

    useEffect(() => {
        fetch("/api/fetch")
            .then((r) => r.json())
            .then(setData);
    }, [setData]);

    useEffect(() => {
        if (data.length > 0) {
            setRandom();
        }
    }, [data, setCurrentItem]);

    return (
        <div className="fetch">
            <button onClick={setRandom}>New quote</button>
            <p>{delta}ms</p>
            <div>{currentItem}</div>
        </div>
    );
}
