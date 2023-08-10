<script>
    import { onMount } from "svelte";
    let count = 0;
    const setCount = () => {
        count += 1;
    };

    onMount(() => {
        const id = setInterval(setCount, 1000);
        return () => clearInterval(id);
    });
</script>

<span>{count}</span>
