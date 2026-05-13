"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.defaultChecked || false);

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            props.onChange?.(e);
          }}
          className="sr-only peer"
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            "peer-checked:bg-primary peer-checked:text-primary-foreground",
            "cursor-pointer flex items-center justify-center",
            className
          )}
          onClick={() => setChecked(!checked)}
        >
          {checked && <Check className="h-3 w-3 text-primary-foreground" />}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
