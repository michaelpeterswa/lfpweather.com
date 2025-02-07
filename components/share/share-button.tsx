"use client";
import { cn } from "@/lib/utils";
import { ShareProps } from "./types";
import { Share } from "lucide-react";
import { useState } from "react";

export default function ShareButton({ props }: { props: ShareProps }) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!navigator.share) {
      alert("Web Share API is not supported in this browser. Sorry!");
      return;
    }

    if (isSharing) {
      return;
    }

    setIsSharing(true);

    try {
      await navigator.share({
        title: props.title,
        text: props.description,
        url: props.url,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.warn("user cancelled share action");
      } else {
        console.error("error web-share-api:", error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div onClick={handleShare} className="border rounded-lg p-2">
      <Share
        className={cn(
          "w-8 h-8",
          props.className,
          isSharing ? "disabled text-muted-foreground" : ""
        )}
      />
    </div>
  );
}
