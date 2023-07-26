package main

import (
	"htmx/counter"
	"htmx/interval"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/htmx/go/counter", counter.Get)
	r.POST("/htmx/go/counter", counter.Post)

	r.GET("/htmx/go/interval", interval.Get)
	r.POST("/htmx/go/interval", interval.Post)
	r.Run(":3002")
}
