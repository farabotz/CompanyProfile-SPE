import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border border-black/5 bg-white shadow-sm shadow-black/5 ${className}`}
    >
      {children}
    </div>
  );
}
