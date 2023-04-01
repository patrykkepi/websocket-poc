import express, { Express, Request, Response } from "express";
const { WebSocketServer, WebSocket } = require("ws");
const http = require("http");

const app = express();

app.use("/ping", (req: Request, res: Response) => {
  console.log("ping");
  if (req.query && req.query.token && req.query.message) {
    const token = req.query.token.toString();
    const message = req.query.message;
    const now = (new Date()).getTime()
    broadcastMessage(
      {
        message: message,
        timestamt: now
      },
      token
    );
    res.status(200).json({
      message: "sent",
    });
  } else {
    res.status(500).json({
      message: "error",
    });
  }
});
app.listen(8888, () => {
  console.log("api listen on 8888");
});

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// I'm maintaining all active connections in this object
const clients: any = {};
// I'm maintaining all active users in this object

function broadcastMessage(json: any, token: string) {
  const data = JSON.stringify(json);
  let client = clients[token];
  if (!!client && client.readyState === WebSocket.OPEN) {
    console.log("sending");
    client.send(data);
  }
}

function handleOnConnect(buff: any, connection: any) {
  const token = JSON.parse(buff).token;
  console.log(token);
  clients[token] = connection;
}

// A new client connection request received
wsServer.on("connection", (connection: any) => {
  console.log("Recieved a new connection");

  connection.on("message", (message: any) => {
    console.log("connect");
    handleOnConnect(message, connection);
  });
});
