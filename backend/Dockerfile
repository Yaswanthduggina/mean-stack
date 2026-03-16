# Build stage for backend
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

# Production stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
