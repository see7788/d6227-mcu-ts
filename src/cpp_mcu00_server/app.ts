import { createServer  as createNetServer} from 'node:net'
import config from "./config"
import express from "express"
import { Server as createSocketIoServer } from "socket.io";
import MqttServer, { Client as mqttClient } from 'aedes'
import {} from "mqtt"
import { createServer as createHttpServer} from "http";
const expressServerObj = express();
// expressServerObj.get('/index.html', (req, res) => {
//     res.end('hello index')
// })
// expressServerObj.get('*', (req, res) => {
//     res.end('**********')
// },console.log)
// expressServerObj.listen(8888)
// const httpServerObj = createHttpServer(expressServerObj);
// httpServerObj.listen(8888)
// const SocketIoServerObj = new createSocketIoServer(httpServerObj);
// SocketIoServerObj.listen(8888)

// console.log(config)

// const mqttServerObj = new MqttServer()
// createNetServer(mqttServerObj.handle).listen(config.port, function () {
//     console.log('aedes on port ')
// })

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    hello: () => void;
  }
  
  interface InterServerEvents {
    ping: () => void;
  }
  
  interface SocketData {
    name: string;
    age: number;
  }
  const io = new createSocketIoServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

io.on("connection", (socket) => {
    socket.emit("noArg");
    socket.emit("basicEmit", 1, "2", Buffer.from([3]));
    socket.emit("withAck", "4", (e) => {
      // e is inferred as number
    });
  
    // works when broadcast to all
    io.emit("noArg");
  
    // works when broadcasting to a room
    io.to("room1").emit("basicEmit", 1, "2", Buffer.from([3]));
  });
