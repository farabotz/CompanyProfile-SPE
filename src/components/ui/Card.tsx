import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-neutral-200/80 bg-white shadow-xs transition-all duration-300 hover:shadow-md hover:border-neutral-300 ${className}`}
    >
      {children}
    </div>
  );
}
