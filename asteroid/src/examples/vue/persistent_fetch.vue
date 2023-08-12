<template>
    <div class="fetch">
        <button @click="newItem">New quote</button>
        <p>{{ delta }}ms</p>
        <div>{{ currentItem }}</div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            items: [],
            currentItem: "",
            delta: 0,
        };
    },
    mounted() {
        fetch("/api/fetch")
            .then((r) => r.json())
            .then((items) => (this.items = items) && this.newItem());
    },
    methods: {
        newItem() {
            const tick = new Date().getTime();
            this.currentItem =
                this.items[Math.floor(Math.random() * this.items.length)];
            this.delta = new Date().getTime() - tick;
        },
    },
};
</script>
