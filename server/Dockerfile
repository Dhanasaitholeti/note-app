FROM node:alpine

RUN npm install -g typescript

WORKDIR /server

COPY package.json .

RUN npm install

COPY . .

RUN tsc


EXPOSE 8080

CMD [ "npm", "start" ]
