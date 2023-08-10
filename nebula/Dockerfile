FROM nginx:1.25

RUN mkdir /app
WORKDIR /app

COPY nginx.conf /app/nginx.conf

CMD ["nginx", "-c", "/app/nginx.conf", "-g", "daemon off;"]