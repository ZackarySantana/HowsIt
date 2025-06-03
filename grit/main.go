package main

import (
	"os"

	"github.com/zackarysantana/howsit/grit/counter"
	"github.com/zackarysantana/howsit/grit/fetch"
	"github.com/zackarysantana/howsit/grit/interval"
	"github.com/zackarysantana/howsit/grit/todo"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	r := gin.Default()
	r.GET("/", health)

	r.GET("/htmx/go/counter", counter.Get)
	r.POST("/htmx/go/counter", counter.Post)

	r.GET("/htmx/go/interval", interval.Get)
	r.POST("/htmx/go/interval", interval.Post)

	r.GET("/htmx/go/todo", todo.Get)
	r.POST("/htmx/go/todo", todo.Post)
	r.POST("/htmx/go/delete/todo", todo.Delete)

	r.GET("/htmx/go/fetch", fetch.Get)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3002"
	}

	r.Run(":" + port)
}

func health(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "ok",
	})
}
