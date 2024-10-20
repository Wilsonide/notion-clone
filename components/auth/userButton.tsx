"use client";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LogoutButton } from "./logoutButton";
import { LogOut } from "lucide-react";

import Link from "next/link";
import { Settings } from "lucide-react";
import { LoginButton } from "./login-button";

export const UserButton = () => {
  const { user } = useCurrentUser();
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-teal-900">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]" align="end">
        {user && (
          <>
            <DropdownMenuItem className="flex items-center justify-start">
              <Avatar className="mr-2">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-sky-500">
                  <User className="text-white" />
                </AvatarFallback>
              </Avatar>
              {user?.email}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutButton variant="ghost">
              <DropdownMenuItem className="flex items-center justify-start">
                <LogOut className="h-4 w-4 mr-5" />
                Logout
              </DropdownMenuItem>
            </LogoutButton>
          </>
        )}

        {!user && (
          <>
            <LoginButton>
              <DropdownMenuItem className="flex items-center justify-start">
                <LogOut className="h-4 w-4 mr-5" />
                Login
              </DropdownMenuItem>
            </LoginButton>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
