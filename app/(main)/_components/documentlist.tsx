"use client";
import { Documents } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Item from "./item";
import { FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: Documents[];
}

const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [documents, setDocuments] = useState<Documents[]>();

  useEffect(() => {
    fetch(`/api/documents?parentDocumentId=${parentDocumentId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("documents =======================================", data);
        setDocuments(data);
      });
  }, []);

  const onExpanded = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden",
        )}
      >
        No pages inside
      </p>
      {documents?.map((document) => (
        <div key={document.id}>
          <Item
            id={document.id}
            onClick={() => onRedirect(document.id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon ?? undefined}
            active={params.documentId === document.id}
            level={level}
            onExpand={() => onExpanded(document.id)}
            expanded={expanded[document.id]}
          />
          {expanded[document.id] && (
            <DocumentList parentDocumentId={document.id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

/*  useEffect(()=>{
        fetch('/api/documents')
        .then((res) => res.json())
        .then((data) => {
            console.log("documents =======================================",data);
            setDocuments(data)
            setIsLoading(false)
        })
      
    
        
    },[]) */

export default DocumentList;
