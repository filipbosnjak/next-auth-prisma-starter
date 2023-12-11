"use client";

import React from "react";
import { AblyProvider, useChannel } from "ably/react";
import * as Ably from "ably";
import { LogEntry } from "@/(components)/Logger";
import MessagesList from "@/app/messages/components/MessagesList";

export type MessagesProps = {
  user: string;
};

const client = new Ably.Realtime.Promise({
  authUrl: "/ably",
  authMethod: "POST",
});

const Messages = ({ user }: MessagesProps) => {
  // Sub to user channel

  console.log("user: ", user);
  return (
    <>
      <AblyProvider client={client}>
        <MessagesList user={user} />
      </AblyProvider>
    </>
  );
};

export default Messages;
