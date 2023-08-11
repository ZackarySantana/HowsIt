/** @jsxImportSource solid-js */

import { Show, createSignal, onMount } from "solid-js";

function showTop() {
    const [show, setShow] = createSignal(false);

    onMount(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
    });

    return show;
}

function showBottom() {
    const [show, setShow] = createSignal(true);

    onMount(() => {
        window.addEventListener("scroll", () => {
            if (
                window.scrollY <
                document.body.scrollHeight - window.innerHeight - 100
            ) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
    });

    return show;
}

export default function Goto() {
    const top = showTop();
    const bottom = showBottom();

    return (
        <div class="fixed bottom-5 right-10 flex flex-col gap-2 lg:bottom-[90px] lg:right-[10vw]">
            <Show when={top()}>
                <a
                    href="#top"
                    class="block rounded-full border-2 border-solid border-gray-500 bg-secondary-background p-1 shadow-lg"
                >
                    <img
                        src="/arrow_right.svg"
                        alt="arrow right"
                        width="24"
                        height="24"
                        class="rotate-[270deg]"
                    />
                </a>
            </Show>
            <Show when={bottom()}>
                <a
                    href="#bottom"
                    class="block rounded-full border-2 border-solid border-gray-500 bg-secondary-background p-1 shadow-lg"
                >
                    <img
                        src="/arrow_right.svg"
                        alt="arrow right"
                        width="24"
                        height="24"
                        class="rotate-90"
                    />
                </a>
            </Show>
        </div>
    );
}
