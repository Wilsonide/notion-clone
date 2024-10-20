"use client";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { LoginButton } from "@/components/auth/login-button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { UserButton } from "@/components/auth/userButton";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "300", "600"],
});

export const Navbar = () => {
  const scrolled = useScrollTop();
  const { user, status } = useCurrentUser();
  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1f1f1f]",
        scrolled && "border-b shadow-sm",
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {status === "loading" && <Spinner />}
        {!user && status === "unauthenticated" && (
          <>
            <LoginButton>Get Motion Free</LoginButton>
            <LoginButton mode="modal">Login</LoginButton>
          </>
        )}

        {user && status === "authenticated" && (
          <>
            <Button
              asChild
              size="sm"
              variant="link"
              className={cn("font-semibold", font.className)}
            >
              <Link href="/documents">Enter Motion</Link>
            </Button>
            <UserButton />
          </>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};
