import React from "react";
import { cn } from "../../utils/cn";

const Button = React.forwardRef(({ className, variant = "primary", size = "md", ...props }, ref) => {
  const variants = {
    primary: "bg-indigo-800 text-white hover:bg-blue-700 shadow-md",
    secondary: "bg-gray-200 text-black hover:bg-indigo-800 hover:text-white",
    outline: "border border-indigo-800 text-indigo-800 hover:bg-indigo-50",
    ghost: "hover:bg-gray-100 text-gray-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
    icon: "p-2",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "rounded-md font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
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
