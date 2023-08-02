/** @jsxImportSource solid-js */

import { createSignal, onMount } from "solid-js";

export default function Goto() {
    const [showTop, setShowTop] = createSignal(false);
    const [showBottom, setShowBottom] = createSignal(true);

    onMount(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setShowTop(true);
            } else {
                setShowTop(false);
            }
            console.log(document.body.scrollHeight);
            console.log(window.height);
            console.log(window.scrollY);
            if (
                window.scrollY <
                document.body.scrollHeight - window.innerHeight - 100
            ) {
                setShowBottom(true);
            } else {
                setShowBottom(false);
            }
        });
    });

    return (
        <div class="fixed bottom-5 right-10 flex flex-col gap-2 lg:bottom-[90px] lg:right-[10vw]">
            <Show when={showTop()}>
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
            <Show when={showBottom()}>
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
