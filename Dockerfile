#Container for Chat-React app

FROM node:6.9.1

WORKDIR /home/$user

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["node", "server.js"]
