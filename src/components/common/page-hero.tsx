import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { AppRoute } from "@/config/routes";
import { cn } from "@/lib/utils/cn";

type HeroAction = {
  href: AppRoute;
  label: string;
};

type PageHeroProps = {
  action?: HeroAction;
  backgroundClassName?: string;
  className?: string;
  contentClassName?: string;
  description: string;
  imageSrc: string;
  overlayClassName?: string;
  showOverlay?: boolean;
  title: ReactNode;
};

type PageHeroKeywordStripProps = {
  className?: string;
  items?: readonly string[];
};

const defaultHeroKeywords = [
  "mineral",
  "relax",
  "soak",
  "wellness",
  "renewal",
  "thermal",
  "spa",
  "steam",
] as const;

const defaultHeroOverlay =
  "bg-[linear-gradient(58.94deg,#000_4.33%,rgba(0,0,0,0.24)_83.9%)]";

export function PageHero({
  action,
  backgroundClassName,
  className,
  contentClassName,
  description,
  imageSrc,
  overlayClassName,
  showOverlay = true,
  title,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "h-[620px] bg-[#546881] sm:h-[680px] lg:h-[751px]",
        className,
      )}
    >
      <div
        style={{ backgroundImage: `url(${imageSrc})` }}
        className={cn(
          "relative isolate flex h-full w-full overflow-hidden bg-cover bg-center",
          backgroundClassName,
        )}
      >
        {showOverlay ? (
          <div
            aria-hidden="true"
            className={cn("absolute inset-0 z-0", defaultHeroOverlay, overlayClassName)}
          />
        ) : null}

        <div
          className={cn(
            "relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-center px-5 sm:px-8 lg:items-start lg:px-[120px] lg:pt-[287px]",
            contentClassName,
          )}
        >
          <div className="flex w-full max-w-[776px] flex-col items-start gap-8">
            <div className="flex w-full flex-col items-start gap-6 lg:gap-8">
              <h1 className="font-serif text-[44px] font-medium leading-[1.08] text-white sm:text-[56px] lg:text-[72px] lg:leading-[74px]">
                {title}
              </h1>
              <p className="max-w-[676px] text-lg font-normal leading-7 tracking-[-0.02em] text-[#d2d2d2] sm:text-[22px]">
                {description}
              </p>
            </div>

            {action ? <Button href={action.href}>{action.label}</Button> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHeroKeywordStrip({
  className,
  items = defaultHeroKeywords,
}: PageHeroKeywordStripProps) {
  return (
    <section
      aria-label="Wellness keywords"
      className={cn("overflow-hidden bg-surface py-[42px]", className)}
    >
      <div className="flex w-max animate-keyword-marquee items-center will-change-transform">
        <KeywordStripItems items={items} />
        <KeywordStripItems aria-hidden="true" items={items} />
      </div>
    </section>
  );
}

function KeywordStripItems({
  items,
  ...props
}: {
  "aria-hidden"?: "true";
  items: readonly string[];
}) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8" {...props}>
      {items.map((item) => (
        <div className="flex shrink-0 items-center gap-8" key={item}>
          <Image
            aria-hidden="true"
            alt=""
            className="size-[22px] shrink-0"
            height={22}
            src="/Images/hash.svg"
            width={22}
          />
          <span className="whitespace-nowrap font-serif text-[32px] font-semibold leading-[22px] tracking-[-0.02em] text-foreground">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}
