"use client";

import React from 'react'
import {Button} from "@/components/ui/button";
import {MessageInput} from "@/app/api/messages/route";

const TestButton = () => {

    return (
        <Button onClick={() => {
            const message: MessageInput = {
                sender: "client",
                receiver: "server",
                message: "Hello from client"
            }
            fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message)
            }).then((res) => {
            })
        }}>Test</Button>
    )
}

export default TestButton;