import {RegisterResponse} from "@/app/api/register/route";
import {NextRequest, NextResponse} from "next/server";
import messageServer from "@/message-server/server";

export type MessageInput = {
    sender: string;
    receiver: string;
    message: string;
}

export async function POST(
    req: NextRequest,
    res: NextResponse<RegisterResponse>,
) {
    const message = (await req.json()) as MessageInput;
    const {server, id} = messageServer
    console.log("emitting message")
    server?.emit('message', "server server")
    console.log("sockets: ", await server?.allSockets(), "server: ", id)

    setTimeout(() => {
        if (server !== null) {
            console.log("message server is not null")
        }
        server?.emit('message', "server server")
    }, 2000)
    return Response.json({
        message: "User created",
    });
}