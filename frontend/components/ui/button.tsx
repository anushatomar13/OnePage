import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Near-white solid — the primary, high-contrast CTA (Vercel/Linear feel)
        default:
          "bg-foreground text-background hover:bg-foreground/90 shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset]",
        // Iridescent brand gradient
        accent:
          "bg-[linear-gradient(100deg,var(--grad-1),var(--grad-2),var(--grad-3))] text-primary-foreground hover:brightness-110",
        // Glass, subtle
        glass: "glass text-foreground hover:border-border-strong",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-white/[0.04]",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
