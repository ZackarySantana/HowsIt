package fetch

import (
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

const inputTemplate = `
%s
`

func element(text string) string {
	return text
}

func Get(c *gin.Context) {
	api := strings.TrimSuffix(os.Getenv("API_URL"), "/")
	resp, err := http.Get(fmt.Sprintf("%s/api/fetch", api))
	if err != nil {
		fmt.Println(err)
		return
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	items := strings.Split(string(body), "\",\"")
	item := items[rand.Intn(len(items))]
	fmt.Println(item)
	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(element(item)))
}
