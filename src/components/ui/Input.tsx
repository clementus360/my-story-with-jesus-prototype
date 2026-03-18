import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-[#333] text-sm font-medium leading-5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`
            w-full border border-[#858585] bg-white
            px-4 py-4 rounded-full
            text-sm text-[#333] leading-[18px]
            placeholder:text-[#858585]
            outline-none overflow-hidden
            focus:border-[#3949ab] focus:ring-2 focus:ring-[#3949ab]/20
            disabled:bg-[#f5f5f5] disabled:text-[#666] disabled:cursor-not-allowed
            transition-colors
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
            ${className ?? ""}
          `}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-xs leading-4">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
