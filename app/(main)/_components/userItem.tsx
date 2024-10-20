"use client";
import { LogoutButton } from "@/components/auth/logoutButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ChevronsLeftRight, LogOut } from "lucide-react";
import React from "react";

const UserItem = () => {
  // render user item with avatar, name, and email
  const { user } = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.image || ""} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.name}&apos;s Motion
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.email}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image || ""} />
              </Avatar>
            </div>
            <p className="text-sm line-clamp-1">{user?.name}&apos;s Motion</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <LogoutButton variant="ghost">
          <DropdownMenuItem className="flex items-center justify-start w-full">
            <LogOut className="h-4 w-4 mr-5" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
