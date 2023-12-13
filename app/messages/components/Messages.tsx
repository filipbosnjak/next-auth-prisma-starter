"use client";

import React from "react";
import { AblyProvider, useChannel } from "ably/react";
import * as Ably from "ably";
import MessagesList from "@/app/messages/components/MessagesList";
import { DBMessage } from "@/app/api/get-messages/route";
import SingleMessageView from "@/app/messages/components/SingleMessageView";

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
            <MessagesList
              user={user}
              messages={messages}
              setSingleMessageView={setSingleMessageView}
              setCurrentMessage={setCurrentMessage}
            />
          </div>
        )}
      </AblyProvider>
    </>
  );
};

export default Messages;
