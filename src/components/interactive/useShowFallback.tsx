import { createSignal, onMount } from "solid-js";

export default function useShowFallback() {
    const [showFallback, setShowFallback] = createSignal(true);

    onMount(() => {
        setShowFallback(false);
    });

    return [showFallback, setShowFallback];
}
