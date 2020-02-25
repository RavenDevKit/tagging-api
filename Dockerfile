FROM node:10-alpine

RUN apk add --no-cache git tini bash

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "./bin/www" ]

ENTRYPOINT [ "/sbin/tini", "--" ]
