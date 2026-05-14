import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";

import { GradientText, SectionBadge, SectionHeading } from "@/components/ui";

const cedarFeatures = [
  {
    title: "Low-EMF Infrared Heaters",
    description:
      "Medical-grade technology for deep tissue penetration without the radiation risks of standard units.",
  },
  {
    title: "Smart Airflow Dynamics",
    description:
      "Continuous fresh air exchange ensures you breathe fresh, filtered air while maintaining constant core heat.",
  },
] as const;

export function CedarTechSection() {
  return (
    <section className="bg-background px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 lg:flex-row lg:gap-[72px]">
        <div className="relative h-[420px] w-full max-w-[481px] overflow-hidden rounded-[16px] bg-[#9c4545] sm:h-[520px] lg:h-[636px] lg:shrink-0">
          <Image
            fill
            priority={false}
            alt="Woman relaxing inside a cedar sauna"
            className="object-cover object-center"
            sizes="(min-width: 1024px) 481px, 100vw"
            src="/Images/why-us/cedar-tech.png"
          />
        </div>

        <div className="flex w-full max-w-[647px] flex-col items-start gap-8">
          <div className="flex max-w-[560px] flex-col items-start gap-3">
            <SectionBadge>Premium Wellness Experience</SectionBadge>
            <SectionHeading>
              Western Red Cedar & <GradientText>Precision Tech</GradientText>
            </SectionHeading>
          </div>

          <p className="max-w-[647px] text-lg leading-6 text-muted">
            We don&apos;t settle for &quot;good enough.&quot; Our saunas are crafted from
            sustainably sourced Western Red Cedar, chosen for its anti-microbial
            properties and iconic thermal resonance.
          </p>

          <div className="flex w-full flex-col gap-6">
            {cedarFeatures.map((feature) => (
              <FeatureRow
                description={feature.description}
                key={feature.title}
                title={feature.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type FeatureRowProps = {
  description: string;
  title: string;
};

function FeatureRow({ description, title }: FeatureRowProps) {
  return (
    <div className="flex w-full items-start gap-[22px]">
      <FaCircleCheck
        aria-hidden="true"
        className="mt-1 size-5 shrink-0 text-[#952c04]"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="text-base font-bold leading-6 text-foreground">{title}</h3>
        <p className="text-lg leading-6 text-muted">{description}</p>
      </div>
    </div>
  );
}
