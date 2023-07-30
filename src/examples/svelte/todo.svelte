<script>
    import { onMount } from "svelte";
    let todos = [];
    $: completedAmount = todos.filter((todo) => todo.completed).length;

    onMount(() => {
        todos = [
            { text: "Learn web dev", completed: true },
            { text: "Learn Svelte", completed: false },
        ];
    });

    let newTodo = "";

    function addTodo() {
        todos = [...todos, { text: newTodo, completed: false }];
        newTodo = "";
    }

    function clearTodos() {
        todos = [];
    }

    function toggleCompleted(i) {
        return () => {
            todos = todos.map((todo, index) => {
                return {
                    ...todo,
                    completed: i == index ? !todo.completed : todo.completed,
                };
            });
        };
    }

    function deleteTodo(i) {
        return () => {
            todos = todos.filter((_, index) => i !== index);
        };
    }
</script>

<div class="todo-container">
    <p>Completed: {completedAmount}</p>
    <div class="todo-header">
        <input
            bind:value={newTodo}
            on:change={addTodo}
            type="text"
        />
        <button on:click={clearTodos}>Clear</button>
    </div>
    <ul class="todo-parent">
        {#each todos as todo, i}
            <li class="todo-item">
                <span class={todo.completed ? "todo-completed" : ""}>
                    {todo.text}
                </span>
                <button on:click={toggleCompleted(i)}>Toggle</button>
                <button on:click={deleteTodo(i)}>Delete</button>
            </li>
        {/each}
    </ul>
</div>
