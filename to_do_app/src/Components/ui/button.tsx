import * as React from "react"
// import { VariantProps } from "class-variance-authority"
import './Button.module.css'
import { cn } from "@/lib/utils"
import styles from "./Button.module.css" // Use .module.css for CSS Modules

type ButtonVariant = "default" | "destructive" | "outline"
type ButtonSize = "default" | "sm" | "lg"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    // Compose class names using CSS classes
    const classes = cn(
      styles.button,
      styles[variant],
      styles[size],
      className
    )

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }