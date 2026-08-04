import type { ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  onClick?: never;
  type?: never;
}

interface ClickButtonProps extends CommonProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
}

type ButtonProps = LinkButtonProps | ClickButtonProps;

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-orange text-white hover:bg-brand-orange-dark shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  secondary: "border border-brand-teal/30 text-brand-teal-dark hover:bg-brand-teal/5 hover:border-brand-teal/60 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  ghost: "text-brand-teal-dark hover:bg-brand-teal/5 active:scale-[0.98]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange";

export function Button({ children, variant = "primary", className = "", href, onClick, type }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
