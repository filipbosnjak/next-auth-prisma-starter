import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { DBMessage } from "@/app/api/get-messages/route";
import { Button } from "@/components/ui/button";

export type SingleMessageViewProps = {
  message: DBMessage;
  setSingleMessageView: React.Dispatch<React.SetStateAction<boolean>>;
};

const SingleMessageView = ({
  message,
  setSingleMessageView,
}: SingleMessageViewProps) => {
  return (
    <>
      <Button
        className={"text-xl"}
        onClick={() => {
          setSingleMessageView(false);
        }}
      >
        <IoIosArrowRoundBack />
      </Button>
      SingleMessageView
      {message.subject} - {message.text}
    </>
  );
};

export default SingleMessageView;
