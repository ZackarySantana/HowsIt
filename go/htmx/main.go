package main

import (
	"htmx/counter"
	"htmx/interval"
	"htmx/todo"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/htmx/go/counter", counter.Get)
	r.POST("/htmx/go/counter", counter.Post)

	r.GET("/htmx/go/interval", interval.Get)
	r.POST("/htmx/go/interval", interval.Post)

	r.GET("/htmx/go/todo", todo.Get)
	r.POST("/htmx/go/todo", todo.Post)
	r.POST("/htmx/go/delete/todo", todo.Delete)

	r.Run(":3002")
}
