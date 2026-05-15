import type { IconType } from "react-icons";
import {
  HiOutlineClock,
  HiOutlineKey,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUser,
} from "react-icons/hi2";

import {
  LegalContent,
  LegalParagraph,
} from "@/components/common/legal-content";

const bookingRules = [
  {
    description:
      "Please arrive 5-10 minutes before your scheduled start time. This ensures you have time to locate your suite and enter your access code smoothly.",
    icon: HiOutlineClock,
    title: "Arrival & Timing",
  },
  {
    description:
      "Every booking is for a 50-minute block. You must vacate the sauna and the private suite promptly at the end of your session to allow our staff to perform the sanitization protocol for the next guest.",
    icon: HiOutlineClock,
    title: "Strict 50-Minute Limit",
  },
  {
    description:
      "Your unique 10-digit alphanumeric code will activate exactly 2 minutes before your session begins. This code is valid for a single entry and will deactivate automatically at the end of your time block.",
    icon: HiOutlineShieldCheck,
    title: "Access Code Usage",
  },
  {
    description:
      "Our private suites are designed for only 1 adult. Adhering to this limit ensures safety, comfort, and the longevity of our heating technology.",
    icon: HiOutlineUser,
    title: "Guest Occupancy",
  },
  {
    description:
      "Maintain a clean environment. Use the provided towel on the cedar benches at all times. Do not use oils or scents directly on the heater stones unless explicitly permitted by staff.",
    icon: HiOutlineSparkles,
    title: "Cleaning Protocol",
  },
] as const;

export function BookingRulesContent() {
  return (
    <LegalContent badgeLabel="Guest Guidelines" title="Booking Rules">
      <LegalParagraph>
        To ensure a premium and safe experience for everyone, we kindly ask you
        to follow these simple operational rules.
      </LegalParagraph>

      <div className="flex flex-col gap-8">
        {bookingRules.map((rule, index) => (
          <BookingRuleCard
            description={rule.description}
            icon={index === 0 ? HiOutlineKey : rule.icon}
            key={rule.title}
            title={rule.title}
          />
        ))}
      </div>
    </LegalContent>
  );
}

function BookingRuleCard({
  description,
  icon: Icon,
  title,
}: {
  description: string;
  icon: IconType;
  title: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-white p-[22px] transition-colors hover:border-[#da8d49] focus-within:border-[#da8d49]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[12px] bg-[#fff7ed] text-primary">
          <Icon aria-hidden="true" className="size-[26px]" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h2 className="font-serif text-lg font-bold leading-[22px] text-foreground">
            {title}
          </h2>
          <p className="text-base leading-[1.6] text-muted">{description}</p>
        </div>
      </div>
    </article>
  );
}
