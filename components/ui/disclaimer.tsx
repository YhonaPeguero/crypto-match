"use client"

import { cn } from "@/lib/utils"
import { ShieldAlert } from "lucide-react"
import * as React from "react"

interface DisclaimerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "bordered"
  text?: string
}

export function Disclaimer({ className, variant = "subtle", text, ...props }: DisclaimerProps) {
  const base =
    "text-[11px] sm:text-xs text-muted-foreground inline-flex items-center gap-1.5 leading-relaxed"
  const styles =
    variant === "bordered"
      ? "rounded-full border bg-background/70 px-3 py-1"
      : "opacity-80"

  return (
    <div className={cn(base, styles, className)} {...props}>
      <ShieldAlert className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-600" />
      <span>{text ?? "NFA • Not investment advice. Do your own research."}</span>
    </div>
  )
}



