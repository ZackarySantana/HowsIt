package main

import (
	"htmx/counter"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/htmx/go/counter", counter.CounterGet)
	r.POST("/htmx/go/counter", counter.CounterPost)
	r.Run(":3002")
}
