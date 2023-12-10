import {Server} from "socket.io";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import {SERVER_SOCKET_PORT} from "@/lib/utils";
import {v4 as randomUUID} from 'uuid';

export type MessageServer = {
    id: String
    server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | null
}

let messageServer: MessageServer

let globalWithMessageServer = global as typeof globalThis & {
    messageServer: MessageServer;
}
if (!globalWithMessageServer.messageServer) {
    console.log("creating server")
    globalWithMessageServer.messageServer = {
        id: randomUUID(),
        server: new Server({
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        })
    };
    const server = globalWithMessageServer.messageServer.server
    server?.on("connection", async (socket) => {
        console.log("a user connected");
        const sockets = await messageServer?.server?.allSockets()
        console.log("sockets from server", sockets, "server: ", messageServer?.id)
    });

    server?.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            console.log("Address already in use")
        }
    })
    server?.listen(SERVER_SOCKET_PORT);
    console.log("server listening on port: ", SERVER_SOCKET_PORT)
}

messageServer = globalWithMessageServer.messageServer
export default messageServer