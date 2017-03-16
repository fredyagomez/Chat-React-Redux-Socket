#Container for Chat-React app

FROM node:6.9.1

#ARG PROXY

ENV http_proxy=$PROXY \
    https_proxy=$PROXY \
    no_proxy="/var/run/docker.sock,localaddress,localhost,hpe.com,hpecorp.net,127.0.0.1,10.0.0.0/16,172.0.0.0/16" \
    PORT=1337 \
    user=nodeuser

RUN groupadd -r $user \
    && useradd -ms /bin/bash -r -g $user $user

WORKDIR /home/$user

RUN npm config set proxy $PROXY \
    && npm config set https-proxy $PROXY \
    && npm config set @hpe:registry https://registry.npmjs.itcs.hpecorp.net/

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

USER $user

EXPOSE 1337

CMD ["node", "server.js"]
