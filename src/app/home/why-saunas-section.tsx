import Image from "next/image";

import { FeatureCard } from "@/components/ui/feature-card";
import { SectionBadge } from "@/components/ui/section-badge";
import { GradientText, SectionHeading } from "@/components/ui/section-heading";

const saunaBenefits = [
  {
    description:
      "We value your time. Book as a guest and secure your preferred slot in under 120 seconds",
    title: "2-Min Booking",
  },
  {
    description:
      "Receive your private 10-digit alphanumeric gate code via email the moment you pay.",
    title: "Instant Digital Access",
  },
  {
    description:
      "No crowds and no shared spaces - just you in a premium private sauna for 50 minutes",
    title: "Total Privacy",
  },
] as const;

export function WhySaunasSection() {
  return (
    <section className="bg-surface px-5 py-20 sm:px-8 lg:px-[120px] lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[62px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionBadge>Why Saunas?</SectionBadge>
          <SectionHeading className="capitalize">
            Why Choose B&amp;M <GradientText>Saunas?</GradientText>
          </SectionHeading>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {saunaBenefits.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <FeatureCard
      className="border-t border-primary bg-[linear-gradient(180deg,rgba(250,226,15,0.06)_61.11%,rgba(248,73,6,0.06)_111.11%)] hover:bg-primary"
      description={description}
      descriptionClassName="text-lg group-hover:text-white"
      icon={
        <div className="relative size-full">
          <Image
            fill
            alt=""
            aria-hidden="true"
            className="scale-[0.46] object-contain"
            sizes="24px"
            src="/Images/icons/alarm.svg"
          />
        </div>
      }
      iconClassName="overflow-hidden border border-primary-light bg-[linear-gradient(214.38deg,rgba(250,226,15,0.1)_25.12%,rgba(248,73,6,0.1)_102.28%)] transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:bg-none group-hover:shadow-[0_4px_25px_rgba(40,14,4,0.12)]"
      title={title}
      titleClassName="whitespace-nowrap group-hover:text-white"
    />
  );
}
