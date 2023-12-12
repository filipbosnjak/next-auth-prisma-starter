"use client";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
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
