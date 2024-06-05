import React from "react";
import { Input } from "../ui/input";

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
  props,
}: FormInputProps) {
  return (
    <div className={wrapperClass}>
      <label htmlFor={id} className="body-s">
        {label}
      </label>
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
  );
}

export default FormInput;
