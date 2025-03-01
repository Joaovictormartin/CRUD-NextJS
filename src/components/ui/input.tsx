import * as React from "react";
import { LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  iconName: keyof typeof LucideIcons;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconName, ...props }, ref) => {
    const IconComponent = LucideIcons[
      iconName
    ] as React.ComponentType<LucideProps>;

    return (
      <div
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-md border border-input px-3 py-1 shadow-sm",
          className,
        )}
      >
        <input
          ref={ref}
          type={type}
          className={cn(
            "flex-1 bg-transparent text-sm transition-colors file:border-0 placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
        <IconComponent className="h-5 w-5 text-muted-foreground" />
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
