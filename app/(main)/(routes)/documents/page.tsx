"use client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const Documentspage = () => {
  const { user } = useCurrentUser();
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 relative">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty Document"
        className="dark:hidden"
      />

      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty Document"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.name}&apos;s Motion
      </h2>
      <Button>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default Documentspage;
