import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";

import { GradientText, SectionBadge, SectionHeading } from "@/components/ui";

const cedarFeatures = [
  {
    title: "Tailored Experiences",
    description:
      "Choose between the total privacy of our individual cabins or the social energy of our shared sessions.",
  },
  {
    title: "Ice-Cold Rejuvenation",
    description:
      "Every session includes access to our cold plunge pool, the essential partner to your sauna recovery.",
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
            <SectionBadge>THE ULTIMATE RECOVERY HUB</SectionBadge>
            <SectionHeading>
              Elevate Your Wellness with <GradientText>Contrast Therapy</GradientText>
            </SectionHeading>
          </div>

          <p className="max-w-[647px] text-lg leading-6 text-muted">
            Experience the perfect balance of heat and cold. At B&M Saunas, we provide a premium environment designed for deep relaxation and physical recovery. Whether you’re here for a solo session or a communal experience, our facilities are crafted to help you reset and recharge.
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
