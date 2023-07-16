<script>
    let count = 0;
    const setCount = () => {
        count += 1;
    };

    setInterval(setCount, 1000);
</script>

<span>{count}</span>

<style scoped>
    span {
        color: lightblue;
    }
</style>
