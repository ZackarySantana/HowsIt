<template>
    <div class="todo-container">
        <p>Completed: {{ completed }}</p>
        <div class="todo-header">
            <input
                v-model="newTodo"
                @change="addTodo()"
                type="text"
            />
            <button @click="clear()">Clear</button>
        </div>
        <ul class="todo-parent">
            <li
                class="todo-item"
                v-for="(item, i) in todos"
            >
                <span :class="item.completed ? 'todo-completed' : ''">
                    {{ item.text }}
                </span>
                <button @click="toggle(i)">Toggle</button>
                <button @click="delete_(i)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
type TodoItem = {
    text: string;
    completed: boolean;
};
export default {
    data() {
        return {
            todos: [] as TodoItem[],
            newTodo: "",
        };
    },
    computed: {
        completed() {
            return this.todos.filter((item) => item.completed).length;
        },
    },
    methods: {
        addTodo() {
            this.todos.push({
                text: this.newTodo,
                completed: false,
            });
            this.newTodo = "";
        },
        clear() {
            this.todos = [];
        },
        toggle(index: number) {
            this.todos[index].completed = !this.todos[index].completed;
        },
        delete_(index: number) {
            this.todos.splice(index, 1);
        },
    },
    mounted() {
        this.todos.push({
            text: "Learn web dev",
            completed: true,
        });
        this.todos.push({
            text: "Learn Vue",
            completed: false,
        });
    },
};
</script>
