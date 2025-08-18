# syntax=docker/dockerfile:1.7

ARG VITE_API_BASE_URL

FROM node:22-alpine AS build
WORKDIR /app

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY package*.json ./
COPY vite.config.ts tsconfig*.json eslint.config.js ./
COPY public ./public
COPY src ./src

RUN npm ci
RUN npm run build

FROM nginx:1.27-alpine AS runtime
WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/ .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx","-g","daemon off;"]

