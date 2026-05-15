"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheck,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineKey,
  HiPlus,
  HiXMark,
} from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { env } from "@/config/env";
import { routes } from "@/config/routes";
import { useMyBookings } from "@/hooks";
import { cn } from "@/lib/utils/cn";
import { useAppSelector } from "@/store/hooks";
import type { BookingSummary } from "@/types";

type BookingCardItem = BookingSummary & {
  durationMinutes: number;
  totalPriceCents: number;
};

const mockBookings: BookingCardItem[] = [
  {
    accessCode: "BMA-749-291",
    date: "May 26, 2026",
    durationMinutes: 50,
    id: "mock-shared-session",
    serviceName: "50 Mins Shared Session",
    serviceType: "shared",
    status: "confirmed",
    timeRange: "10:00 - 10:50",
    totalPriceCents: 1600,
  },
  {
    accessCode: "BMA-749-291",
    date: "May 31, 2026",
    durationMinutes: 50,
    id: "mock-private-session",
    serviceName: "50 Min Private Sauna Session",
    serviceType: "private",
    status: "confirmed",
    timeRange: "11:00 - 11:50",
    totalPriceCents: 13900,
  },
];

function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("en-IE", {
    currency: "EUR",
    minimumFractionDigits: 2,
    style: "currency",
  }).format(priceCents / 100);
}

function normalizeBooking(booking: BookingSummary): BookingCardItem {
  return {
    ...booking,
    durationMinutes: booking.durationMinutes ?? 50,
    totalPriceCents: booking.totalPriceCents ?? 0,
  };
}

export function MyBookingsView() {
  const router = useRouter();
  const [cancelBooking, setCancelBooking] = useState<BookingCardItem | null>(
    null,
  );
  const customer = useAppSelector((state) => state.bookingFlow.customer);
  const shouldFetchBookings = !env.enableApiMocks;
  const myBookingsQuery = useMyBookings(shouldFetchBookings);
  const bookings = env.enableApiMocks
    ? mockBookings
    : (myBookingsQuery.data ?? []).map(normalizeBooking);

  useEffect(() => {
    if (env.enableApiMocks && !customer) {
      router.replace(routes.bookingStart);
    }
  }, [customer, router]);

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(routes.bookingStart);
  }

  if (env.enableApiMocks && !customer) {
    return null;
  }

  return (
    <section className="bg-background px-5 pb-[100px] pt-8 sm:px-8 lg:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[52px]">
        <button
          className="inline-flex items-center gap-2 text-sm leading-6 text-black transition-colors hover:text-primary"
          onClick={handleBack}
          type="button"
        >
          <HiArrowLeft aria-hidden="true" className="size-5" />
          Back
        </button>

        <div className="flex w-full flex-col items-start gap-8">
          <h1 className="font-serif text-[36px] font-medium leading-[46px] text-foreground">
            Your Bookings
          </h1>

          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
            {myBookingsQuery.isLoading && shouldFetchBookings ? (
              <BookingLoadingCard />
            ) : null}

            {bookings.map((booking) => (
              <BookingCard
                booking={booking}
                key={booking.id}
                onCancel={() => setCancelBooking(booking)}
              />
            ))}

            <NewExperienceCard />
          </div>

          {myBookingsQuery.isError && shouldFetchBookings ? (
            <p className="text-sm leading-5 text-danger">
              Unable to load bookings. Please try again.
            </p>
          ) : null}
        </div>
      </div>

      <CancelBookingModal
        booking={cancelBooking}
        onClose={() => setCancelBooking(null)}
      />
    </section>
  );
}

function BookingCard({
  booking,
  onCancel,
}: {
  booking: BookingCardItem;
  onCancel: () => void;
}) {
  const priceColor =
    booking.serviceType === "private" ? "text-primary-dark" : "text-primary";
  const priceUnitColor =
    booking.serviceType === "private" ? "text-[#826357]" : "text-[#ff7743]";

  return (
    <article className="flex min-h-[335px] flex-col justify-between overflow-hidden rounded-[16px] border border-border bg-white p-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-serif text-[22px] font-semibold capitalize leading-9 text-foreground">
              {booking.serviceName}
            </h2>
            <div className="flex shrink-0 items-center gap-2">
              <BookingMetaBadge>{booking.durationMinutes}m</BookingMetaBadge>
            </div>
          </div>

          <div className="flex items-center gap-1 capitalize">
            <span className={cn("text-[28px] font-bold leading-9", priceColor)}>
              {formatPrice(booking.totalPriceCents)}
            </span>
            <span className={cn("text-base leading-9", priceUnitColor)}>
              /Session
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {booking.serviceType ? (
            <BookingDetail
              icon={
                <Image
                  alt=""
                  aria-hidden="true"
                  className="size-[18px]"
                  height={18}
                  src="/icons/join.svg"
                  width={18}
                />
              }
              label="Session"
              value={formatServiceType(booking.serviceType)}
            />
          ) : null}
          <BookingDetail
            icon={<HiOutlineKey aria-hidden="true" />}
            label="Access Code"
            value={booking.accessCode ?? "Pending"}
          />
          <BookingDetail
            icon={<HiOutlineCalendarDays aria-hidden="true" />}
            label="Date"
            value={booking.date}
          />
          <BookingDetail
            icon={<HiOutlineClock aria-hidden="true" />}
            label="Time"
            value={booking.timeRange}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-[11px]">
        <Button
          className="px-4 text-sm sm:text-base"
          fullWidth
          hideDefaultIcon
          href={routes.bookingReschedule(booking.id)}
        >
          Reschedule
        </Button>
        <button
          className="inline-flex h-[47px] w-full items-center justify-center rounded-pill border border-[#807e7e] bg-transparent px-4 text-sm font-normal tracking-[-0.02em] text-[#807e7e] transition-colors hover:border-primary hover:text-primary sm:text-base"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </article>
  );
}

function CancelBookingModal({
  booking,
  onClose,
}: {
  booking: BookingCardItem | null;
  onClose: () => void;
}) {
  return (
    <Modal
      ariaLabel="Cancel booking"
      className="max-w-[600px] rounded-[12px] border border-[#f8fafc] bg-white px-6 py-12 shadow-[0px_20px_50px_rgba(0,0,0,0.1)] sm:px-[65px] sm:py-[65px]"
      isOpen={Boolean(booking)}
      onClose={onClose}
      size="lg"
    >
      {booking ? (
        <div className="relative flex w-full flex-col items-center gap-[22px]">
          <button
            aria-label="Close cancel booking modal"
            className="absolute -right-1 -top-8 flex size-8 items-center justify-center text-[#666464] transition-colors hover:text-foreground sm:-right-10 sm:-top-10"
            onClick={onClose}
            type="button"
          >
            <HiXMark aria-hidden="true" className="size-7" />
          </button>

          <div className="flex size-[53px] items-center justify-center rounded-full bg-primary text-white">
            <HiCheck aria-hidden="true" className="size-9 stroke-[2.5]" />
          </div>

          <div className="flex w-full flex-col items-center text-center">
            <h2 className="font-serif text-[32px] font-medium leading-tight text-foreground sm:text-[36px] sm:leading-[62px]">
              Cancel Your Booking
            </h2>
            <p className="text-base leading-6 text-muted">
              You can request a refund after cancelling.
            </p>
          </div>

          <div className="w-full rounded-[8px] border border-[#fee4da] bg-[#fff1eb] p-[17px]">
            <div className="flex flex-col gap-1">
              <p className="text-base font-bold leading-6 text-foreground">
                {booking.serviceName}
              </p>
              <p className="text-sm font-semibold leading-5 tracking-[0.05em] text-muted">
                {booking.date} &bull; {booking.timeRange}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-[22px]">
            <Button
              className="w-full"
              fullWidth
              href={routes.bookingCancel(booking.id)}
              rightIcon={<HiArrowRight aria-hidden="true" className="size-[18px]" />}
            >
              Continue to Cancel
            </Button>
            <button
              className="flex h-[47px] w-full items-center justify-center rounded-pill border border-[#807e7e] px-[22px] py-2.5 text-base leading-[26px] tracking-[-0.02em] text-[#807e7e] transition-colors hover:border-primary hover:text-primary"
              onClick={onClose}
              type="button"
            >
              Go Back
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}

function BookingMetaBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-7 shrink-0 items-center justify-center rounded-pill border border-[#feede6] bg-[rgba(248,73,6,0.04)] px-[11px] text-base font-semibold leading-[22px] tracking-[0.12em] text-primary">
      {children}
    </span>
  );
}

function formatServiceType(serviceType: NonNullable<BookingSummary["serviceType"]>) {
  return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
}

function BookingDetail({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-5 text-base leading-5 sm:gap-[49px]">
      <div className="flex min-w-0 flex-1 items-center gap-1.5 text-muted">
        <span className="flex size-[18px] shrink-0 items-center justify-center text-lg">
          {icon}
        </span>
        <span className="whitespace-nowrap">{label}</span>
      </div>
      <span className="shrink-0 whitespace-nowrap text-foreground">{value}</span>
    </div>
  );
}

function NewExperienceCard() {
  return (
    <Link
      className="flex min-h-[240px] flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border p-4 text-center transition-colors hover:border-primary lg:min-h-[335px]"
      href={routes.bookingNewService}
    >
      <div className="flex w-full flex-col items-center gap-3">
        <span className="flex size-[52px] items-center justify-center rounded-full bg-primary-light text-[32px] text-muted">
          <HiPlus aria-hidden="true" />
        </span>
        <div className="flex w-full flex-col items-center justify-center gap-1.5">
          <h2 className="w-full font-serif text-[22px] font-semibold capitalize leading-[29px] text-[#807e7e]">
            New Experience
          </h2>
          <p className="max-w-[248px] text-base leading-[23px] text-[#959493]">
            Explore our available services and book your next session
          </p>
        </div>
      </div>
    </Link>
  );
}

function BookingLoadingCard() {
  return (
    <div className="min-h-[335px] animate-pulse rounded-[16px] border border-border bg-white p-4">
      <div className="h-8 w-3/4 rounded bg-border" />
      <div className="mt-4 h-8 w-24 rounded bg-border" />
      <div className="mt-8 space-y-3">
        <div className="h-5 rounded bg-border" />
        <div className="h-5 rounded bg-border" />
        <div className="h-5 rounded bg-border" />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3">
        <div className="h-[47px] rounded-pill bg-border" />
        <div className="h-[47px] rounded-pill bg-border" />
      </div>
    </div>
  );
}
