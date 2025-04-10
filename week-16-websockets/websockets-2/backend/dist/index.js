"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 3000 });
let allsockets = [];
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
                if (e.room === (currentuserroom === null || currentuserroom === void 0 ? void 0 : currentuserroom.room)) {
                    e.socket.send(parsedmessage.payload.message);
                }
            });
        }
    });
});
