ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

WORKDIR /app
COPY .env /app/.env
COPY package*.json ./
RUN npm install 
COPY . . 
RUN npm run build 
CMD [ "npm", "run", "start:dev" ]