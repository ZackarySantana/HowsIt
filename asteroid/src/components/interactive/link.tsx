/** @jsxImportSource solid-js */

export default function Link(props: {
    href: string;
    class?: string;
    children: string | JSX.Element;
}) {
    const isInternal = props.href.startsWith("/") || props.href.startsWith("#");
    if (isInternal) {
        return (
            <a
                href={props.href}
                class={`text-blue-400 transition-colors hover:text-blue-600 ${props.class}`}
            >
                {props.children}
            </a>
        );
    }

    return (
        <a
            href={props.href}
            class={`text-blue-400 transition-colors hover:text-blue-600 ${props.class}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {props.children}
        </a>
    );
}
