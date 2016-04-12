FROM node

ADD . /app

WORKDIR /app

RUN npm install

RUN npm install -g bower

RUN bower install --allow-root

EXPOSE 8080

CMD ["node", "server.js"]
