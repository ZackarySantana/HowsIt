package counter

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type counterForm struct {
	Counter int `form:"counter_go"`
}

const elementTemplate = `
%d
<input
	type="hidden"
	name="counter_go"
	value="%d"
/>
`

func element(index int) string {
	return fmt.Sprintf(elementTemplate, index, index)
}

func CounterGet(c *gin.Context) {
	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(element(0)))
}

func CounterPost(c *gin.Context) {
	counter := counterForm{}
	if err := c.Bind(&counter); err != nil {
		return
	}

	delta := 0

	if _, ok := c.GetQuery("increment"); ok {
		delta += 1
	}

	if _, ok := c.GetQuery("decrement"); ok {
		delta -= 1
	}

	e := element(counter.Counter + delta)

	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(e))
}
