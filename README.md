# Chat-React-Redux

Create a chat app running on React/Socket io. Component states are controlled with Redux.


#Live Example

Share this link with another person or open two broswers to test the app: http://54.201.121.249:3132/ 

# Instructions

##Development Front End

```bash
##Clone or download repository

cd Char-React-Redux-Socket
npm install
npm start
```

##Production

```bash
npm run build
node server.js
```

Open a web browser and navigate to [http://localhost:1337]


##Got Docker?

See more information in Dockerfile

```bash
##Clone or download repository
cd Char-React-Redux-Socket
docker build -t chat_react .
docker run -d -p 1337:1337 chat_react
```

Open a web browser and navigate to [http://localhost:1337]

# Issues?

Please use issue tab to report any bugs.
