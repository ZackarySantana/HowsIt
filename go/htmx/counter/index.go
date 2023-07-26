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

	e := element(counter.Counter + 1)

	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(e))
}
