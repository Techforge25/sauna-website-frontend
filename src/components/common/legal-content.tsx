import Image from "next/image";

import { cn } from "@/lib/utils/cn";

type LegalContentProps = {
  children: React.ReactNode;
  badgeLabel?: string;
  title: string;
  updatedAt?: string;
};

type PartnerCardProps = {
  bgClassName: string;
  description: string;
  logo: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
  title: string;
};

export function LegalContent({
  badgeLabel,
  children,
  title,
  updatedAt,
}: LegalContentProps) {
  return (
    <section className="bg-surface px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 lg:gap-20">
        <header className="mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
          <h1 className="font-serif text-[44px] font-medium leading-[1.08] text-foreground sm:text-[56px] lg:text-[72px] lg:leading-[74px]">
            {title}
          </h1>
          {updatedAt ? (
            <p className="text-sm font-normal uppercase leading-6 tracking-[0.02em] text-muted sm:text-lg">
              Last updated: {updatedAt}
            </p>
          ) : null}
          {badgeLabel ? (
            <p className="flex h-[47px] items-center justify-center rounded-[12px] border border-[#fae20f] bg-[rgba(253,199,178,0.36)] px-4 py-3 text-lg font-normal uppercase leading-6 tracking-[0.06em] text-[#df4205]">
              {badgeLabel}
            </p>
          ) : null}
        </header>

        <div className="flex flex-col gap-8">{children}</div>
      </div>
    </section>
  );
}

export function LegalSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-serif text-[24px] font-bold leading-9 text-foreground sm:text-[26px]">
        {title}
      </h2>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

export function LegalParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base font-normal leading-[1.6] text-muted sm:text-lg sm:leading-[30px]">
      {children}
    </p>
  );
}

export function BulletList({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-3">{children}</ul>;
}

export function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-base leading-[1.6] text-muted sm:text-lg sm:leading-[30px]">
      <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-primary" />
      <span>{children}</span>
    </li>
  );
}

export function PartnerCard({
  bgClassName,
  description,
  logo,
  title,
}: PartnerCardProps) {
  return (
    <article
      className={cn(
        "flex min-h-[176px] flex-col items-start gap-[22px] rounded-[12px] p-[22px] text-white",
        bgClassName,
      )}
    >
      <div className="flex size-[42px] items-center justify-center rounded-[8px] bg-white">
        <Image
          alt={logo.alt}
          className="h-auto max-w-[30px] object-contain"
          height={logo.height}
          src={logo.src}
          width={logo.width}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-[26px] font-bold leading-[31px]">
          {title}
        </h3>
        <p className="text-sm leading-[22px] text-white/90">{description}</p>
      </div>
    </article>
  );
}
