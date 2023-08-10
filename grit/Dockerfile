FROM golang:1.18 as build

# RUN addgroup app_group && adduser -u 10000 -g app_group app_user

RUN mkdir /app
WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 go build -o grit -ldflags '-extldflags "-static"'

# Final image
FROM alpine:latest
# FROM golang:1.18

RUN mkdir /app
WORKDIR /app

COPY --from=build /app/grit /app/grit
RUN chmod +x /app/grit

RUN apk update && apk add curl

# COPY --from=build /etc/passwd /etc/passwd
# USER app_user

ENV GIN_MODE=release

CMD ["/app/grit"]
