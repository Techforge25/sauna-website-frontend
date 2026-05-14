import Image from "next/image";

import { SectionBadge } from "@/components/ui/section-badge";
import { GradientText, SectionHeading } from "@/components/ui/section-heading";

const stats = [
  {
    label: "Natural Cedar",
    value: "100%",
  },
  {
    label: "Exclusive Session",
    value: "50 Min",
  },
] as const;

export function CraftsmanshipSection() {
  return (
    <section className="bg-background px-5 py-20 sm:px-8 lg:px-[120px] lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 lg:flex-row lg:gap-[72px]">
        <div className="relative h-[520px] w-full overflow-hidden rounded-2xl bg-[#9c4545] sm:h-[636px] lg:w-[481px] lg:shrink-0">
          <Image
            fill
            alt="Premium cedar sauna exterior"
            className="object-cover"
            sizes="(min-width: 1024px) 481px, 100vw"
            src="/Images/craftsmanship.png"
          />
        </div>

        <div className="flex w-full max-w-[647px] flex-col items-start gap-8">
          <div className="flex w-full max-w-[490px] flex-col items-start gap-3">
            <SectionBadge>The Craftsmanship</SectionBadge>
            <SectionHeading>
              Premium Wellness,
              <br />
              <GradientText>Refined.</GradientText>
            </SectionHeading>
          </div>

          <div className="flex flex-col gap-6 text-lg font-normal leading-6 text-muted">
            <p>
              Our saunas are built with premium cedar wood and advanced heating
              technology to ensure a deep detox and improved circulation.
            </p>
            <p>
              Every detail is meticulously crafted to create an atmosphere of
              warmth and tranquility. From the soft ambient lighting to the
              natural aroma of fresh cedar, your 50-minute session is designed
              for complete mental and physical restoration. Perfect for
              post-workout recovery or a mental reset in the heart of the city.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-[54px]">
            {stats.map((stat, index) => (
              <div className="flex items-center gap-[54px]" key={stat.label}>
                {index > 0 ? (
                  <div className="hidden h-[72px] w-px bg-[linear-gradient(180deg,rgba(248,73,6,0)_0%,rgba(248,73,6,0.35)_50%,rgba(248,73,6,0)_100%)] sm:block" />
                ) : null}
                <div className="flex flex-col items-start gap-[3px]">
                  <p className="font-serif text-[42px] font-medium leading-[62px] text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xl font-normal capitalize leading-7 tracking-[0.12em] text-muted">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
