"use client";

import React, { useState } from "react";
import { Copy, Check, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface JsonViewerProps {
  data: any;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  maxHeight?: string;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  title = "Response",
  className,
  style,
  maxHeight = "400px",
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn("border rounded-lg", className)}
      style={{
        backgroundColor: "#111111", // card color from design system
        borderColor: "#2E2E2E", // border color from design system
        ...style,
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          borderColor: "#2E2E2E", // border color
          backgroundColor: "#1A1A1A", // panel color for header
        }}
      >
        <h3
          className="text-lg font-semibold"
          style={{ color: "#FFFFFF" }} // text primary
        >
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleCollapse}
            className="h-8 w-8 p-0"
            style={{
              color: "#A6A6A6", // text secondary
            }}
          >
            {isCollapsed ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0"
            style={{
              color: isCopied ? "#00D084" : "#A6A6A6", // success green when copied, text secondary otherwise
            }}
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-4">
          <pre
            className="text-sm overflow-auto p-4 rounded-md border font-mono"
            style={{
              color: "#FFFFFF", // text primary for JSON content
              backgroundColor: "#0D0D0D", // ultra dark background for code
              borderColor: "#2E2E2E", // border color
              maxHeight,
            }}
          >
            <code>{jsonString}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
