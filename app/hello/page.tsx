import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import { authUser } from "@/(components)/utils/ServerUtils";

export type PageProps = {};

const Page = async (props: PageProps) => {
  await authUser();
  // @ts-ignore
  return <>hello {session.user.name}</>;
};

export default Page;
