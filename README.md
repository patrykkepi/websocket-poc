# Websocket POC
### backend express.js + ts 
###### rest api with one endpoint /ping on port 8888
###### werbsocket server on port 8000
### frontend vite + react + ts
###### react app on port 5173

## Instructions:
### in directory backend
##### npm install
##### npm run dev

### in directory frontend
##### npm install
##### npm run dev 

## How to test: 
###### start backend and frontend - commands above
###### open browser http://localhost:5173/ 
###### open browser localhost:8888/ping?token=random-string-token&message=hello to ping rest api server to send message to fronted via websocket
