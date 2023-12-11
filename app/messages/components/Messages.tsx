"use client";

import React from "react";
import { AblyProvider, useChannel } from "ably/react";
import * as Ably from "ably";
import { LogEntry } from "@/(components)/Logger";
import MessagesList from "@/app/messages/components/MessagesList";
import { DBMessage } from "@/app/api/get-messages/route";

export type MessagesProps = {
  user: string;
  messages: DBMessage[];
};

const client = new Ably.Realtime.Promise({
  authUrl: "/ably",
  authMethod: "POST",
});

const Messages = ({ user, messages }: MessagesProps) => {
  // Sub to user channel

  console.log("user: ", user);
  return (
    <>
      <AblyProvider client={client}>
        <MessagesList user={user} />
        {messages.map((message) => {
          return (
            <ul>
              <li key={message.id}>
                <span>{message.subject}</span>
                <span>{message.text}</span>
                <span>{message.fromId}</span>
                <span>{message.toId}</span>
              </li>
            </ul>
          );
        })}
      </AblyProvider>
    </>
  );
};

export default Messages;
