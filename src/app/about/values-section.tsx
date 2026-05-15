import Image from "next/image";
import type { IconType } from "react-icons";
import { HiLockClosed, HiSignal, HiSparkles } from "react-icons/hi2";

import { FeatureCard } from "@/components/ui/feature-card";
import { SectionBadge } from "@/components/ui/section-badge";
import { GradientText, SectionHeading } from "@/components/ui/section-heading";

const valueCards = [
  {
    description:
      "Exclusive 50 minute access to our premium sauna for total privacy and relaxation.",
    icon: HiLockClosed,
    title: "Private Sessions",
  },
  {
    description:
      "Join a communal 50-minute wellness session, perfect for meeting fellow sauna lovers.",
    icon: HiSignal,
    title: "Shared Sessions",
  },
  {
    description:
      "Rejuvenate your body with contrast therapy in our ice-cold recovery plunge pool.",
    icon: HiSparkles,
    title: "Cold Plunge Pool",
  },
] as const;

export function ValuesSection() {
  return (
    <section className="bg-surface px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[70px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionBadge>Values</SectionBadge>
          <SectionHeading className="max-w-[566px]">
            The Core Values That <GradientText>Drive Us</GradientText>
          </SectionHeading>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-4">
          <ValueCard {...valueCards[0]} />
          <ValueImage
            alt="Guest relaxing inside a cedar sauna"
            src="/Images/about/value-sauna-person.png"
          />
          <ValueCard {...valueCards[1]} />
          <ValueImage
            alt="Illuminated barrel sauna at night"
            src="/Images/about/value-night-sauna.png"
          />
          <ValueCard {...valueCards[2]} />
          <ValueImage
            alt="Spacious cedar sauna interior"
            className="lg:col-span-3"
            src="/Images/about/value-sauna-interior.png"
          />
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  description,
  icon: Icon,
  title,
}: {
  description: string;
  icon: IconType;
  title: string;
}) {
  return (
    <FeatureCard
      className="min-h-[313px] border border-transparent bg-[linear-gradient(180deg,rgba(250,226,15,0.1)_61.11%,rgba(248,73,6,0.1)_111.11%)] hover:border-primary"
      contentClassName="justify-between"
      description={description}
      descriptionClassName="text-base"
      icon={
        <Icon aria-hidden="true" className="size-6" />
      }
      title={title}
    />
  );
}

function ValueImage({
  alt,
  className,
  src,
}: {
  alt: string;
  className?: string;
  src: string;
}) {
  return (
    <div
      className={`relative min-h-[313px] overflow-hidden rounded-xl border-t border-transparent bg-[linear-gradient(180deg,rgba(250,226,15,0.06)_61.11%,rgba(248,73,6,0.06)_111.11%)] transition-colors duration-300 hover:border-primary ${className ?? ""}`}
    >
      <Image
        fill
        alt={alt}
        className="object-cover"
        sizes="(min-width: 1024px) 25vw, 100vw"
        src={src}
      />
    </div>
  );
}
