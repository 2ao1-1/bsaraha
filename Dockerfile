FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
