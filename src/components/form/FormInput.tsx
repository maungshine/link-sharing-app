import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

type FormInputProps = {
  label: string;
  type: string;
  wrapperClass: string;
  id: string;
  name: string;
  placeholder: string;
  className?: string;
  src: string;
  props?: React.ComponentPropsWithoutRef<"input">;
  error?: string;
};

function FormInput({
  label,
  type,
  src,
  id,
  name,
  placeholder,
  wrapperClass,
  className,
  error,
  props,
}: FormInputProps) {
  return (
    <div className={cn("", wrapperClass)}>
      <label htmlFor={id} className="body-s">
        {label}
      </label>
      <div className="relative">
        <Image
          alt="email icon"
          className="h-4 w-4 absolute top-[50%] bottom-[50%] -translate-y-[50%] left-4"
          src={src as string}
          width={32}
          height={32}
        />
        {error && (
          <div className="absolute bsolute top-[50%] bottom-[50%] -translate-y-[50%] pointer-events-none left-4 w-full h-full flex items-center">
            <span className="mr-5 body-s text-destructive ml-auto" role="alert">
              {error}
            </span>
          </div>
        )}
        <Input
          src={src}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={className}
          {...props}
        />
      </div>
    </div>
  );
}

export default FormInput;
