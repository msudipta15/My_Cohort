import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3000 });

interface User {
  socket: WebSocket;
  room: String;
}

let allsockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    //@ts-ignore
    const parsedmessage = JSON.parse(message);
    if (parsedmessage.type === "join") {
      allsockets.push({
        socket,
        room: parsedmessage.payload.roomID,
      });
    }

    if (parsedmessage.type === "chat") {
      const currentuserroom = allsockets.find((e) => e.socket == socket);

      allsockets.forEach((e) => {
        if (e.room === currentuserroom?.room) {
          e.socket.send(parsedmessage.payload.message);
        }
      });
    }
  });
});
