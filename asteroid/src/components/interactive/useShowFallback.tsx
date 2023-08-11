import { createSignal, onMount } from "solid-js";

export default function useShowFallback(): ReturnType<
    typeof createSignal<boolean>
> {
    const [showFallback, setShowFallback] = createSignal(true);

    onMount(() => {
        setTimeout(() => {
            setShowFallback(false);
        }, 200);
    });

    return [showFallback, setShowFallback];
}
