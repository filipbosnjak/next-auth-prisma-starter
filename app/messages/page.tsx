import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authUser } from "@/(components)/utils/ServerUtils";
import dynamic from "next/dynamic";

export type PageProps = {};

export type ServerSession = {
  user: { name: string; email: string; image: string; role: string };
};

const Messages = dynamic(() => import("./components/Messages"), {
  ssr: false,
});

const Page = async (props: PageProps) => {
  const session1 = await authUser();
  console.log("session1: ", session1);
  const session: ServerSession = (await authUser()) as ServerSession;
  console.log("session: ", session);
  return (
    <>
      messages
      <Button>
        <Link href={"/messages/newmessage"}>New message</Link>
      </Button>
      <Messages user={session.user.email} />
    </>
  );
};

export default Page;
