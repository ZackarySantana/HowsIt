package counter

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type counterForm struct {
	Index int `form:"counter_go"`
}

const elementTemplate = `
%d
<input
	type="hidden"
	name="counter_go"
	value="%d"
/>
`

func element(i int) string {
	return fmt.Sprintf(elementTemplate, i, i)
}

func Get(c *gin.Context) {
	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(element(0)))
}

func Post(c *gin.Context) {
	counter := counterForm{}
	if err := c.Bind(&counter); err != nil {
		return
	}

	delta := 0

	if _, exists := c.GetQuery("increment"); exists {
		delta += 1
	}

	if _, exists := c.GetQuery("decrement"); exists {
		delta -= 1
	}

	e := element(counter.Index + delta)

	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(e))
}
