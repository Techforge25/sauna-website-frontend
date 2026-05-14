"use client";

import Image from "next/image";
import { useState } from "react";

import { SectionBadge } from "@/components/ui/section-badge";
import { GradientText, SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils/cn";

const faqs = [
  {
    answer:
      "Cancellations made 24 hours before the session are eligible for a full refund. Same-day cancellations may be rescheduled but not refunded.",
    question: "What is the refund policy?",
  },
  {
    answer:
      "Fresh towels are available for each session, but you can bring your own if you prefer.",
    question: "Do I need to bring my own towels?",
  },
  {
    answer:
      "Contact support immediately and we will verify your booking details and issue assistance.",
    question: "What if my access code doesn't work?",
  },
  {
    answer:
      "Wear comfortable swimwear or a towel during your private sauna session.",
    question: "What should I wear during the session?",
  },
  {
    answer:
      "If you are pregnant, have heart concerns, or any medical condition affected by heat, consult your doctor before booking.",
    question: "Are there any health restrictions?",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-background px-5 pb-[50px] pt-20 sm:px-8 lg:px-[120px] lg:pt-[100px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="flex w-full max-w-[494px] flex-col items-start gap-10">
          <div className="flex w-full flex-col items-start gap-3">
            <SectionBadge>FAQs</SectionBadge>
            <SectionHeading>
              Frequently Asked <GradientText>Questions</GradientText>
            </SectionHeading>
          </div>

          <Image
            alt="FAQ illustration"
            className="h-auto w-[235px]"
            height={235}
            src="/Images/home/faq-illustration.png"
            width={235}
          />
        </div>

        <div className="flex w-full max-w-[624px] flex-col gap-3.5">
          {faqs.map((faq, index) => (
            <FaqItem
              answer={faq.answer}
              isOpen={openIndex === index}
              key={faq.question}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              question={faq.question}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  answer,
  isOpen,
  onToggle,
  question,
}: {
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  question: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-transparent px-[22px] py-5 transition-colors",
        isOpen ? "border-primary bg-white" : "border-border",
      )}
    >
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 text-left"
        onClick={onToggle}
        type="button"
      >
        <span className="text-lg font-medium leading-[1.6] text-[#282628]">
          {question}
        </span>
        <span className="flex size-6 shrink-0 items-center justify-center text-2xl leading-none text-[#0d1221]">
          {isOpen ? "-" : "+"}
        </span>
      </button>

      {isOpen ? (
        <p className="mt-2.5 text-base font-normal leading-6 text-muted">
          {answer}
        </p>
      ) : null}
    </div>
  );
}
