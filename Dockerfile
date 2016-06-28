FROM node

ADD . /app

WORKDIR /app

RUN npm install

EXPOSE 8080

CMD ["./node_modules/nodemon/bin/nodemon.js", "server.js", "-L"]