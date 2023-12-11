import React from "react";
import { authUser } from "@/(components)/comp";

export type PageProps = {};

const Page = async (props: PageProps) => {
  await authUser();
  return <>asdf</>;
};

export default Page;
