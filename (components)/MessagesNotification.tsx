"use client";
import React, { useEffect } from "react";
import { AiFillMessage } from "react-icons/ai";
import { io } from "socket.io-client";
import { SERVER_SOCKET_PORT } from "@/lib/utils";

const MessagesNotification = () => {
  return (
    <div style={{ fontSize: "35px", color: "blue" }}>
      <AiFillMessage />
    </div>
  );
};

export default MessagesNotification;
