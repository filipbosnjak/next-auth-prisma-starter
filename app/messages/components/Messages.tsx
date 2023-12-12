"use client";

import React from "react";
import { AblyProvider, useChannel } from "ably/react";
import * as Ably from "ably";
import { LogEntry } from "@/(components)/Logger";
import MessagesList from "@/app/messages/components/MessagesList";
import { DBMessage } from "@/app/api/get-messages/route";
import SingleMessageView from "@/app/messages/components/SingleMessageView";
import { DataTableDemo } from "@/app/messages/components/DataTableDemo";

export type MessagesProps = {
  user: string;
  messages: DBMessage[];
};

export const defaultMessage: DBMessage = {
  id: "",
  fromId: "",
  toId: "",
  subject: "",
  text: "",
  createdAt: new Date(),
  isRead: false,
};

const client = new Ably.Realtime.Promise({
  authUrl: "/ably",
  authMethod: "POST",
});

const Messages = ({ user, messages }: MessagesProps) => {
  // Sub to user channel

  const [singleMessageView, setSingleMessageView] =
    React.useState<boolean>(false);

  const [currentMessage, setCurrentMessage] =
    React.useState<DBMessage>(defaultMessage);

  console.log("user: ", user);
  return (
    <>
      <AblyProvider client={client}>
        {singleMessageView ? (
          <SingleMessageView
            message={currentMessage}
            setSingleMessageView={setSingleMessageView}
          />
        ) : (
          <div>
            <MessagesList user={user} />
            {messages.map((message) => {
              return (
                <ul>
                  <li
                    className={"cursor-pointer"}
                    key={message.id}
                    onClick={() => {
                      setCurrentMessage(message);
                      setSingleMessageView(true);
                    }}
                  >
                    <span>
                      {message.subject} - {message.text}
                    </span>
                  </li>
                </ul>
              );
            })}
            <DataTableDemo />
          </div>
        )}
      </AblyProvider>
    </>
  );
};

export default Messages;
