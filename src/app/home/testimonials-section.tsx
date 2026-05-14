"use client";

import Image from "next/image";
import type { TouchEvent } from "react";
import { useState } from "react";

import { SectionBadge } from "@/components/ui/section-badge";
import { GradientText, SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils/cn";

const testimonials = [
  {
    avatar: "/Images/testimonials/sarah-jenkins.png",
    name: "Sarah Jenkins",
    quote:
      "The most relaxing 50 minutes of my week. The cedar wood aroma is incredible and the total privacy is exactly what I needed after a long day.",
    role: "Wellness Enthusiast",
  },
  {
    avatar: "/Images/testimonials/mark-thompson.png",
    name: "Mark Thompson",
    quote:
      "Booking was so fast. I received my arrival code instantly and the facility was spotless. It's truly a premium experience in the heart of the city.",
    role: "Regular Guest",
  },
  {
    avatar: "/Images/testimonials/elena-rodriguez.png",
    name: "Elena Rodriguez",
    quote:
      "Social saunas are fine, but B&M's private concept is a game changer. No crowds, no noise just pure, restorative heat and silence.",
    role: "Yoga Instructor",
  },
] as const;

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const visibleTestimonials = getVisibleTestimonials(activeIndex);

  function showPreviousTestimonial() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1,
    );
  }

  function showNextTestimonial() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % testimonials.length);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0]?.clientX;
    if (typeof touchEndX !== "number") return;

    const swipeDistance = touchStartX - touchEndX;
    const minimumSwipeDistance = 40;

    if (swipeDistance > minimumSwipeDistance) {
      showNextTestimonial();
    }

    if (swipeDistance < -minimumSwipeDistance) {
      showPreviousTestimonial();
    }

    setTouchStartX(null);
  }

  return (
    <section className="bg-surface px-5 py-20 sm:px-8 lg:px-[120px] lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center gap-[62px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <SectionBadge>Testimonials</SectionBadge>
            <SectionHeading className="capitalize">
              What Our Clients <GradientText>Says</GradientText>
            </SectionHeading>
          </div>

          <div
            className="grid w-full touch-pan-y grid-cols-1 gap-4 lg:grid-cols-3"
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
          >
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                className={index > 0 ? "hidden lg:flex" : undefined}
                key={testimonial.name}
                {...testimonial}
              />
            ))}
          </div>
        </div>

        <PaginationDots
          activeIndex={activeIndex}
          count={testimonials.length}
          onChange={setActiveIndex}
        />
      </div>
    </section>
  );
}

function getVisibleTestimonials(activeIndex: number) {
  return testimonials.map((_, offset) => {
    const index = (activeIndex + offset) % testimonials.length;

    return testimonials[index];
  });
}

function TestimonialCard({
  avatar,
  className,
  name,
  quote,
  role,
}: {
  avatar: string;
  className?: string;
  name: string;
  quote: string;
  role: string;
}) {
  return (
    <article
      className={cn(
        "flex min-w-0 flex-col gap-4 rounded-3xl border border-border bg-white p-3",
        className,
      )}
    >
      <div className="flex flex-col gap-3 rounded-xl border-t border-primary bg-[linear-gradient(180deg,rgba(250,226,15,0.06)_61.11%,rgba(248,73,6,0.06)_111.11%)] p-[22px]">
        <StarRating />
        <div className="h-px w-full bg-border" />
        <p className="text-lg font-normal leading-6 text-foreground">
          &quot;{quote}&quot;
        </p>
      </div>

      <div className="flex w-full items-center gap-3 px-1">
        <Image
          alt={name}
          className="size-12 shrink-0 rounded-full object-cover"
          height={48}
          src={avatar}
          width={48}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="truncate font-serif text-[22px] font-semibold capitalize leading-6 text-foreground">
            {name}
          </h3>
          <p className="truncate text-sm font-normal uppercase leading-[18px] tracking-[0.12em] text-muted">
            {role}
          </p>
        </div>
      </div>
    </article>
  );
}

function StarRating() {
  return (
    <div aria-label="5 out of 5 stars" className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          className="mr-[-10px] flex size-8 items-center justify-center rounded-xl last:mr-0"
          key={index}
        >
          <Image
            alt=""
            aria-hidden="true"
            className="size-4"
            height={16}
            src="/Images/icons/star.svg"
            width={16}
          />
        </span>
      ))}
    </div>
  );
}

function PaginationDots({
  activeIndex,
  count,
  onChange,
}: {
  activeIndex: number;
  count: number;
  onChange: (index: number) => void;
}) {
  return (
    <div
      aria-label="Testimonials carousel"
      className="flex items-center justify-center gap-2.5"
      role="tablist"
    >
      {Array.from({ length: count }).map((_, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            aria-label={`Show testimonial set ${index + 1}`}
            aria-selected={isActive}
            className={cn(
              "h-[15px] rounded-pill bg-[#e8e8e8] transition-all duration-300",
              isActive ? "w-[42px] bg-primary" : "w-[15px] hover:bg-primary/40",
            )}
            key={index}
            onClick={() => onChange(index)}
            role="tab"
            type="button"
          />
        );
      })}
    </div>
  );
}
