<script>
    let count = 0;

    const decrement = () => --count;
    const increment = () => ++count;
</script>

<button on:click={decrement}>-</button>
<span>{count}</span>
<button on:click={increment}>+</button>
