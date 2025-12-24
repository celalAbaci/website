import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

export default function Button({ children, variant = "primary", isLoading, className = "", ...props }: ButtonProps) {
  const baseStyles = "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "text-white bg-primary hover:bg-blue-700 focus:ring-blue-500",
    secondary: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500",
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
