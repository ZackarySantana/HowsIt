/** @jsxImportSource solid-js */

import { createSignal, onMount } from "solid-js";
import Tags from "./tags";
import { default as LinkHref } from "./link";

function Link(props: {
    label: string;
    desc: string;
    href: string;
    tags?: string[];
}) {
    const [read, setRead] = createSignal(
        typeof localstorage !== "undefined"
            ? localStorage.getItem(props.href)
            : false,
    );

    onMount(() => {
        const read = localStorage.getItem(props.href);
        if (read) {
            setRead(true);
        }
    });

    return (
        <div class={`my-4 transition-all ${read() ? "read-post" : ""}`}>
            <LinkHref
                href={props.href}
                class="text-2xl font-bold"
            >
                {props.label}
            </LinkHref>
            <p>{props.desc}</p>
            <input
                type="checkbox"
                class="mr-2 mt-2"
                checked={read()}
                onChange={(e) => {
                    setRead(e.currentTarget.checked);
                    console.log(props.href);
                    if (!e.currentTarget.checked) {
                        localStorage.removeItem(props.href);
                        return;
                    }
                    localStorage.setItem(props.href, e.currentTarget.checked);
                }}
            />
            <Tags
                inline
                tags={props.tags?.map((t) => ({
                    label: t,
                }))}
            />
        </div>
    );
}

export default function Links(props: {
    examples: { label: string; desc: string; href: string; tags?: string[] }[];
    placeholder: string;
}) {
    const [filter, setFilter] = createSignal("");

    const examples = () =>
        props.examples.filter(
            (e) =>
                e.label.toLowerCase().includes(filter()) ||
                e.desc.toLowerCase().includes(filter()) ||
                e.tags?.some((t) => t.toLowerCase().includes(filter())),
        );

    return (
        <>
            <div class="mt-8">
                <label
                    for="search"
                    class="text-2xl font-semibold"
                >
                    Search
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder={props.placeholder}
                    class="mt-2 block w-full rounded-md border border-slate-950 bg-slate-800 px-4 py-2 text-gray-100 outline-none focus:border-slate-400 sm:w-[50%]"
                    onInput={(e) =>
                        setFilter(e.currentTarget.value.toLowerCase())
                    }
                />
            </div>
            {examples().map((e) => (
                <Link
                    label={e.label}
                    desc={e.desc}
                    href={e.href}
                    tags={e.tags}
                />
            ))}
        </>
    );
}
