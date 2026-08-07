import { forwardRef, type InputHTMLAttributes } from "react";
import { theme } from "@/constants/theme";
import Label from "./Label";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  required?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label>
            {label}

            {required && <span className="ml-1 text-red-500">*</span>}
          </Label>
        )}

        <input
          ref={ref}
          {...props}
          className={[
            "h-12 w-full rounded-xl",
            "border",
            "px-4",
            "text-sm",
            "outline-none",
            "transition-all duration-200",
            "placeholder:text-slate-400",
            "focus:ring-4",
            className,
          ].join(" ")}
          style={{
            background: theme.colors.surface,
            color: theme.colors.textPrimary,
            borderColor: error ? theme.colors.danger : theme.colors.inputBorder,

            boxShadow: error ? "0 0 0 4px rgba(239,68,68,.12)" : "none",
          }}
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
