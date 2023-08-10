package todo

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type todoAddForm struct {
	Text            *string `form:"todo_go"`
	CompletedAmount int     `form:"todo_completed_amount_go"`
}

type todoDeleteForm struct {
	CompletedAmount int `form:"todo_completed_amount_go"`
}

const swapAttribute = `hx-swap-oob="true"`

func getSwapAttribute(swap bool) string {
	if swap {
		return swapAttribute
	}
	return ""
}

const inputTemplate = `
<input
	type="text"
	name="todo_go"
	id="htmx-todo-main-input-go"
	hx-post="/htmx/go/todo"
	hx-target="#htmx-todo-parent-go"
	hx-swap="beforeend"
	hx-include="#htmx-todo-completed-input-go"
	%s	
/>
`

func input(swap bool) string {
	return fmt.Sprintf(inputTemplate, getSwapAttribute(swap))
}

const completedCounterTemplate = `
<p 
	id="htmx-todo-completed-go"
	%s
>
	Completed: %d
</p>
<input
	type="hidden"
	name="todo_completed_amount_go"
	id="htmx-todo-completed-input-go"
	value="%d"
	%s
/>
`

func completedCounter(amount int, swap bool) string {
	sa := getSwapAttribute(swap)
	return fmt.Sprintf(completedCounterTemplate, sa, amount, amount, sa)
}

const todoTemplate = `
%s
%s
<li class="todo-item">
	<span %s>%s</span>
	<button
		hx-post="/htmx/go/todo%s"
		hx-target="closest li"
		hx-swap="outerHTML"
		hx-include="#htmx-todo-completed-input-go"
	>
		Toggle
	</button>
	<button
		hx-post="/htmx/go/delete/todo%s"
		hx-target="closest li"
		hx-swap="outerHTML"
		hx-include="#htmx-todo-completed-input-go"
	>
		Delete
	</button>
</li>
`

func todoItem(text string, completed bool, completedAmount int, newInput bool) string {
	counterSwap := completedCounter(completedAmount, true)
	inputSwap := input(true)

	if newInput {
		counterSwap = ""
	}

	completedClass := ""
	togglePath := "?toggle=on&text=" + text
	deletePath := ""

	if completed {
		completedClass = "class=\"todo-completed\""
		togglePath = "?toggle=off&text=" + text
		deletePath = "?completed"
	}

	return fmt.Sprintf(todoTemplate, counterSwap, inputSwap, completedClass, text, togglePath, deletePath)
}

const containerTemplate = `
%s
<div class="todo-header">
	%s
	<button
		hx-post="/htmx/go/delete/todo?all"
		hx-target="#htmx-todo-container-go"
	>
		Clear
	</button>
</div>
<ul
	class="todo-parent"
	id="htmx-todo-parent-go"
>
	%s
	%s
</ul>
`

func initialContainer() string {
	cc := completedCounter(1, false)
	i := input(false)
	t1 := todoItem("Learn web dev", true, 0, false)
	t2 := todoItem("Learn Go", false, 0, false)
	return fmt.Sprintf(containerTemplate, cc, i, t1, t2)
}

func container() string {
	cc := completedCounter(0, false)
	i := input(false)
	return fmt.Sprintf(containerTemplate, cc, i, "", "")
}

func Get(c *gin.Context) {
	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(initialContainer()))
}

func Post(c *gin.Context) {
	f := todoAddForm{}
	if err := c.Bind(&f); err != nil {
		return
	}
	text := c.Query("text")
	completed := c.Query("toggle") == "on"

	if text != "" {
		newCompletedAmount := f.CompletedAmount
		if completed {
			newCompletedAmount += 1
		} else {
			newCompletedAmount -= 1
		}

		t := todoItem(text, completed, newCompletedAmount, false)
		c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(t))
		return
	}

	t := todoItem(*f.Text, false, 0, true)
	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(t))
}

func Delete(c *gin.Context) {
	f := todoDeleteForm{}
	if err := c.Bind(&f); err != nil {
		return
	}

	if _, exists := c.GetQuery("all"); exists {
		c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(container()))
		return
	}

	_, completed := c.GetQuery("completed")
	newCompletedAmount := f.CompletedAmount
	// print out tododeleteform
	fmt.Println("tododeleteform", f)

	if completed {
		newCompletedAmount -= 1
	}

	cc := completedCounter(newCompletedAmount, true)
	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(cc))
}
