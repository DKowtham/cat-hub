import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent",
        secondary: "border-transparent",
        destructive: "border-transparent",
        outline: "",
        success: "border-transparent",
        warning: "border-transparent",
        error: "border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, style, ...props }, ref) => {
    // Define Dark Dashboard Design System colors for badges
    const getVariantStyles = (variant: string) => {
      switch (variant) {
        case "default":
          return {
            backgroundColor: "#1E90FF", // primary blue
            color: "#FFFFFF",
          };
        case "secondary":
          return {
            backgroundColor: "#1A1A1A", // panel color
            color: "#FFFFFF",
          };
        case "destructive":
        case "error":
          return {
            backgroundColor: "#FF4D4F", // danger red
            color: "#FFFFFF",
          };
        case "outline":
          return {
            backgroundColor: "transparent",
            color: "#FFFFFF",
            borderColor: "#2E2E2E",
          };
        case "success":
          return {
            backgroundColor: "#00D084", // success green
            color: "#FFFFFF",
          };
        case "warning":
          return {
            backgroundColor: "#FADB14", // warning yellow
            color: "#000000", // black text on yellow for contrast
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
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        style={{ ...variantStyles, ...style }}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
