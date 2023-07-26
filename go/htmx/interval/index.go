package interval

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type intervalForm struct {
	Index int `form:"interval_go"`
}

const elementTemplate = `
%d
<input
	type="hidden"
	name="interval_go"
	value="%d"
/>
`

func element(index int) string {
	return fmt.Sprintf(elementTemplate, index, index)
}

func Get(c *gin.Context) {
	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(element(0)))
}

func Post(c *gin.Context) {
	counter := intervalForm{}
	if err := c.Bind(&counter); err != nil {
		return
	}

	e := element(counter.Index + 1)

	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(e))
}
