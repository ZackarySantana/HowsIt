<template>
    <button @click="decrement">-</button>
    <span>{{ counter }}</span>
    <button v-on:click="increment">+</button>
</template>

<script lang="ts">
export default {
    data() {
        return {
            counter: 0,
        };
    },
    methods: {
        decrement() {
            this.counter--;
        },
        increment() {
            this.counter++;
        },
    },
};
</script>
