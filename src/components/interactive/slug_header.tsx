/** @jsxImportSource solid-js */

import { createSignal, onMount } from "solid-js";
import Tags from "./tags";
import Link from "./link";

export default function SlugHeader(props: {
    label: string;
    author: string;
    authorHref: string;
    href: string;
    tags?: { label: string; color?: string }[];
}) {
    const [read, setRead] = createSignal(
        typeof localstorage !== "undefined"
            ? localStorage.getItem(props.href)
            : false,
    );

    onMount(() => {
        if (localStorage.getItem(props.href)) {
            setRead(true);
        }
    });

    return (
        <div class={`my-4 transition-all ${read() ? "read-post" : ""}`}>
            <h1 class="text-3xl font-bold">{props.label}</h1>
            <span class="italic text-gray-400">
                By <Link href={props.authorHref}>{props.author}</Link>
            </span>
            <div>
                <input
                    type="checkbox"
                    class="mr-2 mt-2"
                    checked={read()}
                    onChange={(e) => {
                        setRead(e.currentTarget.checked);
                        if (!e.currentTarget.checked) {
                            localStorage.removeItem(props.href);
                            return;
                        }
                        localStorage.setItem(
                            props.href,
                            e.currentTarget.checked,
                        );
                    }}
                />
                <Tags
                    inline
                    tags={props.tags}
                />
            </div>
        </div>
    );
}
