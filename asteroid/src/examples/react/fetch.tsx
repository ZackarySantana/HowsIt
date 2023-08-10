/** @jsxImportSource react */

import { useEffect, useState } from "react";

export default function React() {
    const [data, setData] = useState([]);
    const [currentItem, setCurrentItem] = useState("");

    const setRandom = () => {
        setCurrentItem(data[Math.floor(Math.random() * data.length)]);
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
            <div>{currentItem}</div>
        </div>
    );
}
