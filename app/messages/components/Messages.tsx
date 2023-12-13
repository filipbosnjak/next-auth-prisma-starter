"use client";

import React from "react";
import { AblyProvider } from "ably/react";
import * as Ably from "ably";
import MessagesList from "@/app/messages/components/MessagesList";
import { DBMessage } from "@/app/api/get-messages/route";
import SingleMessageView from "@/app/messages/components/SingleMessageView";
import TableDemo from "@/app/messages/components/TableDemo";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { log } from "node:util";

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
            <MessagesList user={user} />

            <Table>
              <TableCaption>Your messages</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Subject</TableHead>
                  <TableHead>Text</TableHead>
                  <TableHead>From ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow
                    key={message.id}
                    className={"cursor-pointer"}
                    onClick={() => {
                      setCurrentMessage(message);
                      setSingleMessageView(true);
                    }}
                  >
                    <TableCell className={message.isRead ? "" : "font-bold"}>
                      {message.subject}
                    </TableCell>
                    <TableCell className={message.isRead ? "" : "font-bold"}>
                      {(message.text?.length || 0) < 20
                        ? message.text
                        : message.text?.substring(0, 20).concat("...")}
                    </TableCell>
                    <TableCell className={message.isRead ? "" : "font-bold"}>
                      {message.fromId}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Footer</TableCell>
                  <TableCell className="text-right">Table footer</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </AblyProvider>
    </>
  );
};

export default Messages;
