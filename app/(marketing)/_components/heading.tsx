"use client";

import { LoginButton } from "@/components/auth/login-button";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { user, status } = useCurrentUser();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans, Unified, Welcome to{" "}
        <span className="underline">Motion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Motion is the connected workspace where <br />
        better, faster work happens.
      </h3>

      {status === "loading" && (
        <div className="flex items-center justify-center w-full">
          <Spinner size="lg" />
        </div>
      )}

      {user && status === "authenticated" && (
        <Button>
          <Link href="/documents" className="flex items-center">
            Enter Motion
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}

      {!user && status === "unauthenticated" && (
        <LoginButton mode="modal">Get Motion Free</LoginButton>
      )}
    </div>
  );
};
