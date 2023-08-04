<template>
    <div class="fetch">
        <button @click="newItem">New quote</button>
        <div>{{ currentItem }}</div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            items: [],
            currentItem: "",
        };
    },
    mounted() {
        fetch("/api/fetch")
            .then((r) => r.json())
            .then((items) => (this.items = items) && this.newItem());
    },
    methods: {
        newItem() {
            this.currentItem =
                this.items[Math.floor(Math.random() * this.items.length)];
        },
    },
};
</script>
