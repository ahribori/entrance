FROM node:10.15.3-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
WORKDIR /usr/src/app/client
RUN npm install && npm rebuild node-sass && npm run build

WORKDIR /usr/src/app/sdk
RUN npm install && npm run build

WORKDIR /usr/src/app/server
RUN npm install && npm run build

EXPOSE 8080

CMD ["npm", "start"]
