"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    size?: "default" | "large"
  }
>(({ className, size = "default", ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#645bc5]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e11] disabled:cursor-not-allowed disabled:opacity-50",
      size === "large" ? "h-7 w-12" : "h-5 w-9",
      props.checked
        ? "bg-[#645bc5] hover:bg-[#847dd7] active:bg-[#847dd7]"
        : "bg-[#2d3136] hover:bg-[#474c54] active:bg-[#474c54]",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform",
        size === "large" ? "h-6 w-6" : "h-4 w-4",
        props.checked
          ? `${size === "large" ? "translate-x-5" : "translate-x-4"} bg-[#9992eb]`
          : "translate-x-0 bg-[#dadde2]",
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
