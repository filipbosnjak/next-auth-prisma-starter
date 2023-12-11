"use client";
import React, { useEffect } from "react";
import { AiFillMessage } from "react-icons/ai";
import { io } from "socket.io-client";
import { SERVER_SOCKET_PORT } from "@/lib/utils";
import Link from "next/link";

const MessagesNotification = () => {
  return (
    <Link href={"/messages"}>
      <div style={{ fontSize: "35px", color: "blue", cursor: "pointer" }}>
        <AiFillMessage />
      </div>
    </Link>
  );
};

export default MessagesNotification;
