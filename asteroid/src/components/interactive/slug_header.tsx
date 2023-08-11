/** @jsxImportSource solid-js */

import { createSignal, onMount } from "solid-js";
import Link from "./link";
import Tags from "./tags";

function useRead(href: string) {
    const [read, setRead] = createSignal(
        typeof localStorage !== "undefined"
            ? localStorage.getItem(href)
            : false,
    );

    onMount(() => {
        if (localStorage.getItem(href)) {
            setRead(true);
        }
    });

    return [read, setRead] as const;
}

export default function SlugHeader(props: {
    label: string;
    author: string;
    authorHref: string;
    href: string;
    tags?: { label: string; color?: string }[];
}) {
    const [read, setRead] = useRead(props.href);

    return (
        <div class={`my-4 transition-all ${read() ? "read-post" : ""}`}>
            <h1 class="text-3xl font-bold title">{props.label}</h1>
            <span class="italic text-gray-400">
                By <Link href={props.authorHref}>{props.author}</Link>
            </span>
            <div>
                <input
                    type="checkbox"
                    class="mr-2 mt-2"
                    checked={read() === true}
                    onChange={(e) => {
                        setRead(e.currentTarget.checked);
                        if (!e.currentTarget.checked) {
                            localStorage.removeItem(props.href);
                            return;
                        }
                        localStorage.setItem(
                            props.href,
                            e.currentTarget.checked + "",
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
