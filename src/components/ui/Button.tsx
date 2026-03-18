import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "flex items-center justify-center gap-1 px-6 py-4 rounded-full text-base leading-4 font-normal transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#3949ab] text-white hover:bg-[#003299] active:bg-[#00194c]",
    secondary:
      "bg-[#f5f5f5] border border-[#3949ab] text-[#3949ab] hover:bg-[#3949ab] hover:text-white active:bg-[#003299] active:text-white",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
