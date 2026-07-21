import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "orange" | "teal";
  className?: string;
}

export function Badge({ children, variant = "teal", className = "" }: BadgeProps) {
  const variantClasses =
    variant === "orange"
      ? "border-brand-orange/30 text-brand-orange-dark bg-brand-orange/5"
      : "border-brand-teal/30 text-brand-teal-dark bg-brand-teal/5";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
