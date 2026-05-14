"use client";

import { useRouter } from "next/navigation";
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineCalendarDays,
  HiOutlineClock,
} from "react-icons/hi2";

import { env } from "@/config/env";
import { routes } from "@/config/routes";
import { useBooking, useRescheduleBooking } from "@/hooks";
import {
  formatDisplayDate,
  mockTimeSlots,
} from "@/lib/booking/mock-booking-data";
import { getCurrentRescheduleSlot } from "@/lib/booking/reschedule-booking-data";
import { cn } from "@/lib/utils/cn";

type RescheduleConfirmationViewProps = {
  selectedEndTime?: string;
  bookingId: string;
  selectedDate: string;
  selectedSlotId: string;
  selectedStartTime?: string;
};

export function RescheduleConfirmationView({
  bookingId,
  selectedDate,
  selectedEndTime,
  selectedSlotId,
  selectedStartTime,
}: RescheduleConfirmationViewProps) {
  const router = useRouter();
  const shouldUseApi = !env.enableApiMocks;
  const bookingQuery = useBooking(bookingId, shouldUseApi);
  const rescheduleBooking = useRescheduleBooking();
  const currentSlot = getCurrentRescheduleSlot(bookingQuery.data);
  const selectedSlot =
    mockTimeSlots.find((slot) => slot.id === selectedSlotId) ??
    mockTimeSlots.find((slot) => slot.isAvailable) ??
    mockTimeSlots[0];
  const startTime = selectedStartTime ?? selectedSlot.startTime;
  const endTime = selectedEndTime ?? selectedSlot.endTime;
  const newSlot = {
    dateLabel: formatDisplayDate(selectedDate),
    serviceName: currentSlot.serviceName,
    timeRange: `${startTime} - ${endTime}`,
  };

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(routes.bookingReschedule(bookingId));
  }

  async function handleConfirm() {
    if (!shouldUseApi) {
      router.push(routes.bookingMyBookings);
      return;
    }

    await rescheduleBooking.mutateAsync({
      bookingId,
      payload: {
        selectedDate,
        selectedSlotId,
      },
    });

    router.push(routes.bookingMyBookings);
  }

  if (bookingQuery.isLoading && shouldUseApi) {
    return (
      <section className="bg-background px-5 py-20 sm:px-8 lg:px-[120px]">
        <div className="mx-auto h-[280px] w-full max-w-[1200px] animate-pulse rounded-[16px] bg-white" />
      </section>
    );
  }

  return (
    <section className="bg-background px-5 pb-[100px] pt-8 sm:px-8 lg:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[62px]">
        <button
          className="inline-flex items-center gap-2 text-sm leading-6 text-black transition-colors hover:text-primary"
          onClick={handleBack}
          type="button"
        >
          <HiArrowLeft aria-hidden="true" className="size-5" />
          Back
        </button>

        <div className="flex w-full flex-col gap-8">
          <h1 className="font-serif text-[32px] font-medium leading-tight text-foreground sm:text-[36px] sm:leading-[62px]">
            Confirmation
          </h1>

          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
            <ConfirmationSlotCard
              label="Old Slot"
              slot={{
                dateLabel: currentSlot.dateLabel,
                serviceName: currentSlot.serviceName,
                timeRange: currentSlot.timeRange,
              }}
            />
            <ConfirmationSlotCard
              isHighlighted
              label="New Slot"
              slot={newSlot}
            />
          </div>

          {bookingQuery.isError && shouldUseApi ? (
            <p className="text-sm leading-5 text-danger">
              Unable to load booking details. Please try again.
            </p>
          ) : null}

          <div className="flex w-full justify-end">
            <button
              className="inline-flex h-[47px] w-[142px] items-center justify-center gap-1 rounded-pill px-[22px] py-2.5 text-base font-normal leading-[22px] tracking-[-0.02em] text-white transition-opacity [background-image:var(--gradient-button)] hover:[background-image:var(--gradient-button-hover)] disabled:pointer-events-none disabled:opacity-60"
              disabled={rescheduleBooking.isPending}
              onClick={handleConfirm}
              type="button"
            >
              Confirm
              <HiArrowRight aria-hidden="true" className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConfirmationSlotCard({
  isHighlighted = false,
  label,
  slot,
}: {
  isHighlighted?: boolean;
  label: string;
  slot: {
    dateLabel: string;
    serviceName: string;
    timeRange: string;
  };
}) {
  return (
    <article
      className={cn(
        "flex flex-col gap-[22px] overflow-hidden rounded-[16px] border bg-white p-4",
        isHighlighted ? "border-primary" : "border-border",
      )}
    >
      <div className="flex flex-col gap-2">
        <p className="text-base leading-5 text-muted">{label}</p>
        <h2 className="font-serif text-lg font-semibold capitalize leading-[29px] text-foreground">
          {slot.serviceName}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        <ConfirmationDetail
          icon={<HiOutlineCalendarDays aria-hidden="true" />}
          label="Date"
          value={slot.dateLabel}
        />
        <ConfirmationDetail
          icon={<HiOutlineClock aria-hidden="true" />}
          label="Time"
          value={slot.timeRange}
        />
      </div>
    </article>
  );
}

function ConfirmationDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
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
