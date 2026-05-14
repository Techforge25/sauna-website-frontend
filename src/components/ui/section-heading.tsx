import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

type GradientTextProps = {
  children: ReactNode;
  className?: string;
};

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-serif text-[40px] font-medium leading-[1.15] text-foreground sm:text-[52px] sm:leading-[62px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-[image:var(--gradient,linear-gradient(180deg,#FAE20F_-61.11%,#F84906_111.11%))] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}
