# Stage 1: Build ứng dụng
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN npm install
COPY . .
# Truyền biến môi trường tại thời điểm build (Build-time arguments) nếu cần thiết cho Vite
ARG VITE_API_URL
ARG VITE_SIGNALR_HUB_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SIGNALR_HUB_URL=$VITE_SIGNALR_HUB_URL
RUN npm run build

# Stage 2: Serve bằng Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
