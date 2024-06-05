import * as React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, src, ...props }, ref) => {
    return (
      <div className="relative">
        <Image
          alt="email icon"
          className="h-4 w-4 absolute top-[50%] bottom-[50%] -translate-y-[50%] left-4"
          src={src as string}
          width={32}
          height={32}
        />
        <input
          type={type}
          className={cn(
            "flex indent-8 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
