import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type FeatureCardProps = {
  className?: string;
  contentClassName?: string;
  description: string;
  descriptionClassName?: string;
  icon?: ReactNode;
  iconClassName?: string;
  title: string;
  titleClassName?: string;
};

export function FeatureCard({
  className,
  contentClassName,
  description,
  descriptionClassName,
  icon,
  iconClassName,
  title,
  titleClassName,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-xl p-[22px] transition-colors duration-300",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col items-start gap-8",
          contentClassName,
        )}
      >
        {icon ? (
          <div
            className={cn(
              "flex size-[52px] shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
              iconClassName,
            )}
          >
            {icon}
          </div>
        ) : null}

        <div className="flex w-full flex-col items-start gap-3">
          <h3
            className={cn(
              "font-serif text-[26px] font-semibold capitalize leading-[29.2px] text-foreground transition-colors duration-300",
              titleClassName,
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "font-normal leading-6 text-muted transition-colors duration-300",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
