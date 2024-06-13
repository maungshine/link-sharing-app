"use client";

import { Button } from "@react-email/components";
import { useRouter } from "next/navigation";
function BackToEditor() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.replace("/push");
      }}
      className="border border-primary rounded-md py-2 text-md font-semibold text-sm text-primary hover:bg-hover-foreground/50 px-4"
    >
      Back to Editor
    </Button>
  );
}

export default BackToEditor;
