import React from "react";
import { Loader2 } from "lucide-react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  variant?: "default" | "outline";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  loading = false,
  children,
  variant = "default",
  className = "",
  disabled,
  ...props
}) => {
  const base =
    "w-full py-3.5 px-6 rounded-2xl font-semibold text-base transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2";

  const variants = {
    default: "eco-gradient text-primary-foreground shadow-lg hover:shadow-xl hover:brightness-110",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={disabled || loading} {...props}>
      {loading && <Loader2 size={18} className="animate-spin" />}
      {children}
    </button>
  );
};

export default PrimaryButton;
