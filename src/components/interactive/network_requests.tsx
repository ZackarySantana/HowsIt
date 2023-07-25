/** @jsxImportSource solid-js */

import { onMount } from "solid-js";

export default function NetworkRequests() {
    onMount(() => {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                const request = entry.responseStart - entry.requestStart;
                if (request > 0) {
                    console.log(`${entry.name}: Request time: ${request}ms`);
                    console.log(entry);
                }
            });
        });

        observer.observe({ type: "resource", buffered: true });
    });

    onMount(() => {
        XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function (value) {
            this.addEventListener(
                "progress",
                function () {
                    console.log("Loading. Here you can intercept...");
                },
                false,
            );
            this.realSend(value);
        };
    });
}
