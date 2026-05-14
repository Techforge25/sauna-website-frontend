import Image from "next/image";

import { cn } from "@/lib/utils/cn";

type SectionBadgeProps = {
  className?: string;
  children: string;
};

export function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex h-7 items-center justify-center gap-2.5 rounded-pill bg-primary/4 px-[11px] py-2.5",
        className,
      )}
    >
      <BadgeIcon />
      <span className="whitespace-nowrap text-base font-normal uppercase leading-[22px] tracking-[0.12em] text-primary">
        {children}
      </span>
      <BadgeIcon />
    </div>
  );
}

function BadgeIcon() {
  return (
    <Image
      aria-hidden="true"
      alt=""
      className="size-2.5 shrink-0"
      height={10}
      src="/Images/hash.svg"
      width={10}
    />
  );
}
