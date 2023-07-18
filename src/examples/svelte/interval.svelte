<script>
    let count = 0;
    const setCount = () => {
        count += 1;
    };

    setInterval(setCount, 1000);
</script>

<span>{count}</span>
