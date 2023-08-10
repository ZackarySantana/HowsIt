<script>
    import { onMount } from "svelte";
    let data = [];
    let currentItem = "";
    const newItem = () => {
        currentItem = data[Math.floor(Math.random() * data.length)];
    };

    onMount(() => {
        fetch("/api/fetch")
            .then((r) => r.json())
            .then((d) => (data = d) && newItem());
    });
</script>

<div class="fetch">
    <button on:click={newItem}>New quote</button>
    <div>{currentItem}</div>
</div>
