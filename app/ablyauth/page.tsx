import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

export type PageProps = {};

const AblyAuthClientComponent = dynamic(
  () => import("./AblyAuthClientComponent"),
  {
    ssr: false,
  },
);

const Page = async (props: PageProps) => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/hello");
  }
  return (
    <>
      ablyauth
      <AblyAuthClientComponent />
    </>
  );
};

export default Page;
