import Image from "next/image";

import { SectionBadge } from "@/components/ui/section-badge";

const bookingSteps = [
  {
    description:
      "Select your preferred slot from our real-time availability calendar.",
    isFeatured: false,
    title: "Choose Date & Time",
  },
  {
    description:
      "Enter your email and pay securely via Stripe, PayPal, or Revolut in seconds.",
    isFeatured: true,
    title: "Secure Checkout",
  },
  {
    description:
      "Receive your unique 10-digit access code via email immediately after booking.",
    isFeatured: false,
    title: "Entry Code Sent",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#101828] px-5 py-20 sm:px-8 lg:px-[120px] lg:py-[100px]">
      <Image
        fill
        alt="Private sauna cabin at night"
        className="absolute inset-0 -z-20 object-cover"
        sizes="100vw"
        src="/Images/home/how-it-works-bg.png"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/45"
      />

      <div className="mx-auto grid min-h-[712px] w-full max-w-[1200px] gap-12 lg:grid-cols-[494px_1fr] lg:items-center lg:gap-[72px]">
        <div className="flex h-full max-w-[494px] flex-col justify-between gap-12">
          <div className="flex flex-col items-start gap-3">
            <SectionBadge className="bg-white/23 text-white [&_span]:text-white">
              How It Work
            </SectionBadge>
            <h2 className="max-w-[494px] font-serif text-[42px] font-medium capitalize leading-[1.12] text-white sm:text-[52px] sm:leading-[62px]">
              Efficiency In Every Action.
            </h2>
          </div>

          <p className="max-w-[494px] text-[22px] font-normal leading-[27px] tracking-[-0.02em] text-white">
            We&apos;ve stripped away the complexity so you can focus on what
            matters: your well-being.
          </p>
        </div>

        <div className="flex w-full flex-col gap-8 lg:ml-auto lg:max-w-[596px]">
          {bookingSteps.map((step, index) => (
            <BookingStepCard
              description={step.description}
              isFeatured={step.isFeatured}
              key={step.title}
              number={index + 1}
              title={step.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingStepCard({
  description,
  isFeatured = false,
  number,
  title,
}: {
  description: string;
  isFeatured?: boolean;
  number: number;
  title: string;
}) {
  return (
    <article
      className={
        isFeatured
          ? "relative overflow-hidden rounded-xl bg-[#221916] p-[22px] text-white shadow-[0_14px_40px_rgba(0,0,0,0.22)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent after:pointer-events-none after:absolute after:bottom-0 after:inset-x-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent lg:ml-[109px] lg:max-w-[379px]"
          : "overflow-hidden rounded-xl border-t border-primary bg-white p-[22px] text-foreground lg:ml-auto lg:max-w-[379px]"
      }
    >
      <div className="flex flex-col items-start gap-8">
        <div
          className={
            isFeatured
              ? "flex size-[52px] items-center justify-center rounded-full border border-primary-light bg-white"
              : "flex size-[52px] items-center justify-center rounded-full border border-primary-light bg-[linear-gradient(214.38deg,rgba(250,226,15,0.1)_25.12%,rgba(248,73,6,0.1)_102.28%)]"
          }
        >
          <span className="font-serif text-[26px] font-semibold leading-[29.2px] text-foreground">
            {number}
          </span>
        </div>

        <div className="flex w-full flex-col items-start gap-3">
          <h3
            className={
              isFeatured
                ? "whitespace-nowrap font-serif text-[26px] font-semibold capitalize leading-[29.2px] text-white"
                : "whitespace-nowrap font-serif text-[26px] font-semibold capitalize leading-[29.2px] text-foreground"
            }
          >
            {title}
          </h3>
          <p
            className={
              isFeatured
                ? "text-lg font-normal leading-6 text-white"
                : "text-lg font-normal leading-6 text-muted"
            }
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
