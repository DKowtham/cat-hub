import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{
    value: string;
    label: string;
  }>;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, style, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={`
            flex h-10 w-full rounded-md border px-3 py-2 text-sm
            ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium
            placeholder:text-gray-400 focus:outline-none focus:ring-2
            disabled:cursor-not-allowed disabled:opacity-50
            appearance-none cursor-pointer
            ${className}
          `}
          style={{
            backgroundColor: "#111111", // card color from design system
            color: "#FFFFFF", // text primary
            borderColor: "#2E2E2E", // border color
            ...style,
          }}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none"
          style={{ color: "#A6A6A6" }} // text secondary
        />
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
