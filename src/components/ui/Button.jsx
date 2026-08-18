import React from "react";
import { cn } from "../../utils/cn";

const Button = React.forwardRef(({ className, variant = "primary", size = "md", ...props }, ref) => {
  const variants = {
    // Use fixed --navy / --on-navy so dark mode never washes out label text
    primary: "btn-navy",
    accent: "btn-accent",
    secondary: "bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--navy)]",
    outline: "border border-[var(--navy)] text-[var(--navy)] dark:border-[var(--accent)] dark:text-[var(--accent)] hover:bg-[var(--navy)] hover:text-[var(--on-navy)] dark:hover:bg-[var(--accent)] dark:hover:text-[var(--accent-text)]",
    ghost: "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg)]",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-base",
    icon: "p-2",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "rounded-[var(--radius-sm)] font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";

export default Button;
