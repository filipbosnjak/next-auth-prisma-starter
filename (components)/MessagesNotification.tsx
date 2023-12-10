"use client";
import React, {useEffect} from 'react'
import {AiFillMessage} from "react-icons/ai";
import {io} from "socket.io-client";
import {SERVER_SOCKET_PORT} from "@/lib/utils";

const MessagesNotification = () => {

    useEffect(() => {
        console.log("attempting to connect")
        const messagesSocket = io(`http://localhost:${SERVER_SOCKET_PORT}`);

        messagesSocket?.on("connect", () => {
            console.log("connected")
        })
        messagesSocket?.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        console.log(messagesSocket)
        messagesSocket?.on("message", (message) => {
            console.log("message received")
            console.log(message)
        })

        return () => {
            console.log("disconnecting")
            messagesSocket?.disconnect();
        };
    }, []);

    return (
        <div style={{fontSize: "35px", color: "blue"}}>
            <AiFillMessage/>
        </div>
    )
}

export default MessagesNotification;