FROM node:10-alpine

WORKDIR /app

COPY package.json /app
COPY /dist /app
RUN npm install
CMD node app.js
EXPOSE 1337

