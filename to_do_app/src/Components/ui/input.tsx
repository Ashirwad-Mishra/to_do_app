import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(styles.input, className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };