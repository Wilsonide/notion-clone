"use client";

import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export const Social = () => {
  const searchParams = useSearchParams();
  const CallbackUrl = searchParams.get("callback");
  const onClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: CallbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full flex items-center gap-x-2"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <p>google signup</p>
        <Image src="/google.png" alt="Google" width={20} height={20} />
      </Button>
      <Button
        size="lg"
        className="w-full flex items-center gap-x-2"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <p>github signup</p>
        <Image
          src="/github.png"
          alt="Github"
          width={20}
          height={20}
          className="dark:bg-white dark:rounded-2xl dark:shadow-md"
        />
      </Button>
    </div>
  );
};
