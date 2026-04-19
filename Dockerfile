FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install && npm run build
EXPOSE 3000

CMD ["node", "dist/apps/api-gateway/main"]