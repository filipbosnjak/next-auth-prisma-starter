"use client";

import React from "react";
import { AblyProvider } from "ably/react";
import * as Ably from "ably";
import MessagesList from "@/app/messages/components/MessagesList";
import { DBMessage } from "@/app/api/get-messages/route";
import SingleMessageView from "@/app/messages/components/SingleMessageView";
import { MdDelete } from "react-icons/md";
import { MdForwardToInbox } from "react-icons/md";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

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

  const handleMessageClicked = async (message: DBMessage) => {
    console.log("message: ", message);
    setCurrentMessage(message);
    setSingleMessageView(true);
    if (!message.isRead) {
      await fetch("/api/messages/read", {
        method: "POST",
        body: JSON.stringify({ id: message.id }),
      });
    }
  };

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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow
                    key={message.id}
                    className={"cursor-pointer"}
                    onClick={async () => {
                      console.log("clicked message: ", message);
                      await handleMessageClicked(message);
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
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Actions</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>

                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(message.id)
                            }
                          >
                            Forward
                            <DropdownMenuShortcut className={"text-xl"}>
                              <MdForwardToInbox />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem onClick={() => {}}>
                            Delete
                            <DropdownMenuShortcut className={"text-xl"}>
                              <MdDelete />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
