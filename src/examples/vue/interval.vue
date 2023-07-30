<template>
    <span>{{ counter }}</span>
</template>

<script lang="ts">
export default {
    data() {
        return {
            counter: 0,
            intervalId: 0,
        };
    },
    mounted() {
        this.intervalId = setInterval(() => {
            this.counter++;
        }, 1000) as any as number;
    },
    unmounted() {
        clearInterval(this.intervalId);
    },
};
</script>
