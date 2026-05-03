import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden bg-night-0 border-2 border-moon", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full transition-all"
      style={{
        width: `${value ?? 0}%`,
        background: "linear-gradient(90deg, var(--xp-gold) 0%, #fff5a0 50%, var(--xp-gold) 100%)",
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
