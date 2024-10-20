"use client";
import PreviewModal from "@/components/previewModal";
import React, { useEffect, useState } from "react";

function ModalProvider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <PreviewModal />
    </>
  );
}

export default ModalProvider;
