/** @jsxImportSource preact */

import { useEffect, useState } from "preact/hooks";

export default function () {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCount((c) => c + 1);
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return (
        <div style={{ color: "orange" }}>Hello world from Preact {count}</div>
    );
}
