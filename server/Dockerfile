FROM node:18

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 80
CMD [ "node","index.js" ]