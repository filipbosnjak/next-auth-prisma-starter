"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Label } from "@radix-ui/react-label";
import { Icons } from "@/components/icons";

export type NewMessageInput = {
  receiver: string;
  sender: string;
  subject: string;
  text: string;
};

export type PageProps = {};

const Page = (props: PageProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<NewMessageInput>();

  const sendMessage: SubmitHandler<NewMessageInput> = async (
    data: NewMessageInput,
  ) => {
    console.log(data);
  };

  return (
    <>
      <div
        className={
          "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-2"
        }
      >
        <form onSubmit={handleSubmit(sendMessage)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="receiver">To:</Label>
              <Input
                id="receiver"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("receiver", { required: true })}
              />
              <Label htmlFor="subject">Subject:</Label>
              <Input
                id="subject"
                placeholder=""
                type="text"
                autoCapitalize="none"
                autoComplete=""
                autoCorrect="off"
                disabled={isLoading}
                {...register("subject", { required: true })}
              />
              <Label htmlFor="receiver">Text:</Label>
              <Input
                id="receiver"
                placeholder=""
                type="text"
                autoCapitalize="none"
                autoComplete=""
                autoCorrect="off"
                disabled={isLoading}
                {...register("text", { required: true })}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send message
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
