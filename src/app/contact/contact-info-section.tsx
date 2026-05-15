import type { IconType } from "react-icons";
import { HiEnvelope, HiMapPin, HiPhone } from "react-icons/hi2";

import { Card } from "@/components/ui";
import { siteConfig } from "@/config/site";

const contactCards = [
  {
    title: "Email Us",
    value: "help@bmsaunas.com",
    icon: HiEnvelope,
  },
  {
    title: "Call Us",
    value: siteConfig.supportPhone,
    icon: HiPhone,
  },
  {
    title: "Our Studio",
    value: siteConfig.address,
    icon: HiMapPin,
  },
] as const;

export function ContactInfoSection() {
  return (
    <section className="bg-surface px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[100px]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 lg:grid-cols-3">
        {contactCards.map((card) => (
          <ContactInfoCard
            icon={card.icon}
            key={card.title}
            title={card.title}
            value={card.value}
          />
        ))}
      </div>
    </section>
  );
}

type ContactInfoCardProps = {
  icon: IconType;
  title: string;
  value: string;
};

function ContactInfoCard({ icon: Icon, title, value }: ContactInfoCardProps) {
  return (
    <Card className="group min-h-[139px] overflow-hidden rounded-xl border-transparent border-t-primary bg-white p-[22px] text-foreground shadow-[0_6px_42px_rgba(87,43,4,0.15)] transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white">
      <div className="flex flex-col items-start gap-8">
        <span className="inline-flex size-[52px] items-center justify-center rounded-lg border border-primary-light bg-[linear-gradient(214.38deg,rgba(250,226,15,0.1)_25.12%,rgba(248,73,6,0.1)_102.28%)] text-primary transition-colors duration-200 group-hover:bg-white">
          <Icon aria-hidden="true" className="size-5" />
        </span>

        <div className="flex w-full flex-col items-start gap-3">
          <h2 className="font-serif text-[26px] font-semibold capitalize leading-[29.2px] text-foreground transition-colors duration-200 group-hover:text-white">
            {title}
          </h2>
          <p className="text-lg leading-6 text-muted transition-colors duration-200 group-hover:text-[#d2d2d2]">
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}
