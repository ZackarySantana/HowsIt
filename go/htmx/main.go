package main

import (
	"htmx/counter"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/htmx/go/counter", counter.CounterGet)
	r.Run(":3002")
}
