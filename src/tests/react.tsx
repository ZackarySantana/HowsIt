/** @jsxImportSource react */

import { useEffect, useState } from "react";

export default function () {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCount((c) => c + 1);
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return <span style={{ color: "green" }}>React {count}</span>;
}
