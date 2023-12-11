import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authUser } from "@/(components)/comp";

export type PageProps = {};

const Page = async (props: PageProps) => {
  await authUser();
  return (
    <>
      messages
      <Button>
        <Link href={"/messages/newmessage"}>New message</Link>
      </Button>
    </>
  );
};

export default Page;
