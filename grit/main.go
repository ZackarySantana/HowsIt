package main

import (
	"htmx/counter"
	"htmx/fetch"
	"htmx/interval"
	"htmx/todo"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	r := gin.Default()
	r.GET("/htmx/go/counter", counter.Get)
	r.POST("/htmx/go/counter", counter.Post)

	r.GET("/htmx/go/interval", interval.Get)
	r.POST("/htmx/go/interval", interval.Post)

	r.GET("/htmx/go/todo", todo.Get)
	r.POST("/htmx/go/todo", todo.Post)
	r.POST("/htmx/go/delete/todo", todo.Delete)

	r.GET("/htmx/go/fetch", fetch.Get)

	r.Run(":3002")
}
