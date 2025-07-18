import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "shadow-sm",
        destructive: "shadow-sm",
        outline: "border shadow-sm",
        secondary: "shadow-sm",
        ghost: "",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Define Dark Dashboard Design System colors
    const getVariantStyles = (variant: string) => {
      switch (variant) {
        case "default":
          return {
            backgroundColor: "#1E90FF", // primary blue
            color: "#FFFFFF",
            borderColor: "transparent",
          };
        case "destructive":
          return {
            backgroundColor: "#FF4D4F", // danger red
            color: "#FFFFFF",
            borderColor: "transparent",
          };
        case "outline":
          return {
            backgroundColor: "transparent",
            color: "#FFFFFF",
            borderColor: "#2E2E2E",
          };
        case "secondary":
          return {
            backgroundColor: "#1A1A1A", // panel color
            color: "#FFFFFF",
            borderColor: "transparent",
          };
        case "ghost":
          return {
            backgroundColor: "transparent",
            color: "#FFFFFF",
          };
        case "link":
          return {
            backgroundColor: "transparent",
            color: "#1E90FF", // primary blue for links
          };
        default:
          return {
            backgroundColor: "#1E90FF",
            color: "#FFFFFF",
          };
      }
    };

    const variantStyles = getVariantStyles(variant || "default");

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{ ...variantStyles, ...style }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
