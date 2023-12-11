import React from "react";
import { useChannel } from "ably/react";
import * as Ably from "ably";

export type MessagesListProps = {
  user: string;
};

const MessagesList = ({ user }: MessagesListProps) => {
  console.log("user: ", user);
  console.log("subscribing to channel: ", user);
  const { channel } = useChannel(user, (message: Ably.Types.Message) => {
    console.log("message: ", message);
  });
  return <>messages list</>;
};

export default MessagesList;
