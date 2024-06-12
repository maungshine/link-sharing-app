"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const CopyLinkToClipboard: React.FC<{
  username: string | null;
  domain: string;
}> = ({ username, domain }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = () => {
    if (!username) {
      setError("Username not found");
      setTimeout(() => setError(null), 2000);
      return;
    }
    const linkToCopy: string = `${domain}/${username}`;

    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <motion.div>
      <Button onClick={copyToClipboard}>Share Link</Button>
      {copied && (
       <motion.div
       initial={{ opacity: 0, x: '-50%' }}
       animate={{ opacity: 1, x: -'50%' }} // Added scale property
       exit={{ opacity: 0.2, x: '-50%' }}
       transition={{ type: 'spring', bounce: 0.2, duration: 1 }}
       className="absolute w-[400px] py-4 px-4 rounded-xl bg-darkgrey text-lightgrey left-[50%] right-[50%]  bottom-10 z-[9999] flex items-center justify-center gap-2"
     >
       <Image
         alt="link icon"
         height={20}
         width={20}
         src={"/assets/images/icon-link.svg"}
       />{" "}
       <span>The link has been copied to your clipboard!</span>
     </motion.div>
      )}
      {error && (
        <span className="absolute w-[400px] py-4 px-4 rounded-xl bg-red-100  border border-red-400 text-red-700 left-[50%] right-[50%] -translate-x-[50%] bottom-10 z-[9999] flex items-center justify-center gap-2">
          {" "}
          <span>{error}</span>
        </span>
      )}
    </motion.div>
  );
};

export default CopyLinkToClipboard;
