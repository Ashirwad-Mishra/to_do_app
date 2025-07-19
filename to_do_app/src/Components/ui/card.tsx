import * as React from "react"
import { cn } from "@/lib/utils"
import styles from "./Card.module.css"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.card, className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.content, className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

export { Card, CardContent }