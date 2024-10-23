"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { Documents } from "@prisma/client";
import { useRouter } from "next/navigation";

const Documentspage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const createDocument = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post<Documents>(
        "/api/documents",
        JSON.stringify({
          title: "Untitled Document",
        }),
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
        },
      );
      router.refresh();
      window.location.reload();
      toast.success("Document created successfully");
      console.log("Document created:", data);
    } catch (error) {
      toast.error("Failed to create document");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
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
      <Button onClick={createDocument} disabled={loading}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default Documentspage;
