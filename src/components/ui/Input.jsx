import React from "react";
import { cn } from "../../utils/cn";

const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium leading-5 text-start text-[var(--muted)]">{label}</label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full h-11 px-4 py-0 border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] text-base leading-none rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all placeholder:text-[var(--muted)]/60",
          "disabled:bg-[var(--bg)] disabled:text-[var(--muted)] disabled:cursor-not-allowed",
          error && "border-red-500 focus:ring-red-200",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
