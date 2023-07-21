/** @jsxImportSource solid-js */

import { createSignal } from "solid-js";

export default function Links(props: {
    examples: { label: string; desc: string; href: string }[];
}) {
    const [filter, setFilter] = createSignal("");

    const examples = () =>
        props.examples.filter(
            (e) =>
                e.label.toLowerCase().includes(filter()) ||
                e.desc.toLowerCase().includes(filter()),
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
                    placeholder="Fetch, etc"
                    class="mt-2 block w-full rounded-md border border-slate-950 bg-slate-800 px-4 py-2 text-gray-100 outline-none focus:border-slate-400 sm:w-[50%]"
                    onInput={(e) =>
                        setFilter(e.currentTarget.value.toLowerCase())
                    }
                />
            </div>
            {examples().map((e) => (
                <div class="my-4">
                    <a
                        href={e.href}
                        class="text-2xl font-bold text-blue-400"
                    >
                        {e.label}
                    </a>
                    <p class="">{e.desc}</p>
                </div>
            ))}
        </>
    );
}
