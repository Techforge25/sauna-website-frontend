"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  HiArrowLeft,
  HiArrowPath,
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

import { env } from "@/config/env";
import { routes } from "@/config/routes";
import { useBooking, useTimeSlots } from "@/hooks";
import {
  calendarDays,
  formatSlashDate,
  weekdays,
} from "@/lib/booking/booking-calendar-data";
import {
  formatDisplayDate,
  mockTimeSlots,
} from "@/lib/booking/mock-booking-data";
import { getCurrentRescheduleSlot } from "@/lib/booking/reschedule-booking-data";
import { cn } from "@/lib/utils/cn";
import type { TimeSlot } from "@/types";

type RescheduleBookingViewProps = {
  bookingId: string;
};

export function RescheduleBookingView({
  bookingId,
}: RescheduleBookingViewProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("2026-05-26");
  const [selectedSlotId, setSelectedSlotId] = useState("10-00");
  const [formError, setFormError] = useState<string | null>(null);
  const shouldUseApi = !env.enableApiMocks;
  const bookingQuery = useBooking(bookingId, shouldUseApi);
  const booking = bookingQuery.data;
  const currentSlot = getCurrentRescheduleSlot(booking, bookingId);
  const serviceId = shouldUseApi
    ? (booking?.service.id ?? "")
    : currentSlot.serviceId;
  const timeSlotsQuery = useTimeSlots(
    { date: selectedDate, serviceId },
    shouldUseApi && Boolean(serviceId),
  );
  const timeSlots = useMemo(
    () => (shouldUseApi ? (timeSlotsQuery.data ?? []) : mockTimeSlots),
    [shouldUseApi, timeSlotsQuery.data],
  );
  const selectedSlot =
    timeSlots.find((slot) => slot.id === selectedSlotId) ?? null;

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(routes.bookingMyBookings);
  }

  function handleNext() {
    if (!selectedDate || !selectedSlot) {
      setFormError("Please select an available date and time slot.");
      return;
    }

    setFormError(null);
    const params = new URLSearchParams({
      date: selectedDate,
      endTime: selectedSlot.endTime,
      slotId: selectedSlot.id,
      startTime: selectedSlot.startTime,
    });

    router.push(
      `${routes.bookingRescheduleConfirmation(bookingId)}?${params.toString()}`,
    );
  }

  if (bookingQuery.isLoading && shouldUseApi) {
    return (
      <section className="bg-background px-5 py-20 sm:px-8 lg:px-[120px]">
        <div className="mx-auto h-[420px] w-full max-w-[1200px] animate-pulse rounded-[16px] bg-white" />
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
          <h1 className="font-serif text-[32px] font-semibold leading-tight text-foreground sm:text-[36px] sm:leading-[62px]">
            Reschedule Session
          </h1>

          <CurrentSlotCard currentSlot={currentSlot} />

          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
            <RescheduleCalendar
              selectedDate={selectedDate}
              setSelectedDate={(date) => {
                setSelectedDate(date);
                setSelectedSlotId("");
              }}
            />
            <RescheduleSlotsPanel
              isLoading={timeSlotsQuery.isLoading && shouldUseApi}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              selectedSlotId={selectedSlotId}
              serviceName={currentSlot.serviceName}
              setSelectedSlotId={setSelectedSlotId}
              slots={timeSlots}
            />
          </div>

          {bookingQuery.isError && shouldUseApi ? (
            <p className="text-sm leading-5 text-danger">
              Unable to load booking details. Please try again.
            </p>
          ) : null}

          {timeSlotsQuery.isError && shouldUseApi ? (
            <p className="text-sm leading-5 text-danger">
              Unable to load available time slots. Please try again.
            </p>
          ) : null}

          {formError ? (
            <p className="text-sm leading-5 text-danger">{formError}</p>
          ) : null}

          <div className="flex w-full justify-end">
            <button
              className="inline-flex h-[47px] min-w-[102px] items-center justify-center gap-1 rounded-pill px-[22px] py-2.5 text-base font-normal leading-[22px] tracking-[-0.02em] text-white transition-opacity [background-image:var(--gradient-button)] hover:[background-image:var(--gradient-button-hover)] disabled:pointer-events-none disabled:opacity-60"
              disabled={!selectedSlot}
              onClick={handleNext}
              type="button"
            >
              Next
              <HiArrowRight aria-hidden="true" className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CurrentSlotCard({
  currentSlot,
}: {
  currentSlot: {
    dateLabel: string;
    serviceName: string;
    timeRange: string;
  };
}) {
  return (
    <div className="flex w-full flex-col gap-6 rounded-[16px] border border-[#e8e3e1] bg-white p-6 sm:p-8">
      <p className="text-base leading-6 text-muted">Your Current Slot</p>
      <div className="flex flex-col gap-3 font-sans text-lg font-semibold capitalize leading-6 text-foreground sm:flex-row sm:items-center">
        <span>{currentSlot.dateLabel}</span>
        <span aria-hidden="true" className="hidden size-1.5 rounded-full bg-foreground sm:block" />
        <span>{currentSlot.timeRange}</span>
      </div>
    </div>
  );
}

function RescheduleCalendar({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}) {
  return (
    <div className="flex flex-col gap-8 rounded-[16px] border border-[#d8dee8] bg-white p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-[22px] font-semibold capitalize leading-7 text-foreground sm:text-[26px]">
          May, 2026
        </h2>
        <div className="flex h-8 items-center justify-center gap-2 rounded-[7px] bg-[#f3f3f3] px-1">
          <button
            aria-label="Previous month"
            className="flex size-7 items-center justify-center rounded-lg text-foreground"
            type="button"
          >
            <HiChevronLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            aria-label="Next month"
            className="flex size-7 items-center justify-center rounded-lg text-foreground"
            type="button"
          >
            <HiChevronRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-x-2 gap-y-4 sm:gap-x-[22px] sm:gap-y-[22px]">
        {weekdays.map((weekday) => (
          <div
            className="pb-1 text-center text-sm leading-[23px] text-muted sm:pb-2 sm:text-base"
            key={weekday}
          >
            {weekday}
          </div>
        ))}

        {Array.from({ length: 4 }).map((_, index) => (
          <span aria-hidden="true" key={`empty-${index}`} />
        ))}

        {calendarDays.map((day) => {
          const isSelected = day.date === selectedDate;

          return (
            <button
              className={cn(
                "flex h-11 items-center justify-center rounded-[12px] p-2.5 text-base font-medium leading-[22px] transition-colors sm:h-12 sm:text-lg",
                day.isAvailable &&
                  !isSelected &&
                  "bg-primary-light text-foreground hover:bg-primary/20",
                !day.isAvailable && "cursor-not-allowed bg-[#dddddd] text-muted",
                isSelected && "bg-primary text-white",
              )}
              disabled={!day.isAvailable}
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              type="button"
            >
              {day.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RescheduleSlotsPanel({
  isLoading,
  selectedDate,
  selectedSlot,
  selectedSlotId,
  serviceName,
  setSelectedSlotId,
  slots,
}: {
  isLoading: boolean;
  selectedDate: string;
  selectedSlot: TimeSlot | null;
  selectedSlotId: string;
  serviceName: string;
  setSelectedSlotId: (slotId: string) => void;
  slots: TimeSlot[];
}) {
  return (
    <div className="flex min-h-[430px] flex-col gap-8 rounded-[16px] border border-[#d8dee8] bg-white p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-8">
      <h2 className="font-serif text-[22px] font-semibold leading-7 text-foreground sm:text-[26px]">
        {formatSlashDate(selectedDate)}
      </h2>

      {isLoading ? (
        <TimeSlotSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {slots.map((slot) => {
            const isSelected = slot.id === selectedSlotId;

            return (
              <button
                className={cn(
                  "flex items-center gap-[9px] rounded-[12px] border p-3 text-center text-lg leading-[22px] transition-colors",
                  slot.isAvailable &&
                    !isSelected &&
                    "border-border bg-white text-foreground hover:border-primary",
                  !slot.isAvailable &&
                    "cursor-not-allowed border-transparent bg-[#dddddd] text-[#807e7e]",
                  isSelected && "border-primary bg-primary text-white",
                )}
                disabled={!slot.isAvailable}
                key={slot.id}
                onClick={() => setSelectedSlotId(slot.id)}
                type="button"
              >
                <span className="min-w-0 flex-1">{slot.startTime}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    isSelected
                      ? "bg-white"
                      : slot.isAvailable
                        ? "bg-foreground"
                        : "bg-[#807e7e]",
                  )}
                />
                <span className="min-w-0 flex-1">{slot.endTime}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="h-px w-full bg-border" />

      <NewSlotSummary
        selectedDate={selectedDate}
        selectedSlot={selectedSlot}
        serviceName={serviceName}
      />
    </div>
  );
}

function NewSlotSummary({
  selectedDate,
  selectedSlot,
  serviceName,
}: {
  selectedDate: string;
  selectedSlot: TimeSlot | null;
  serviceName: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-[16px] border border-border bg-white p-4">
      <h3 className="font-serif text-lg font-semibold leading-6 text-foreground">
        {serviceName}
      </h3>
      <div className="flex flex-col gap-3 text-sm leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2 text-foreground">
          <HiArrowPath aria-hidden="true" className="size-5 text-primary" />
          New Slot
        </span>
        <span>
          {formatDisplayDate(selectedDate)}
          {selectedSlot
            ? `, ${selectedSlot.startTime} - ${selectedSlot.endTime}`
            : ""}
        </span>
      </div>
    </div>
  );
}

function TimeSlotSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="h-12 animate-pulse rounded-[12px] bg-border"
          key={index}
        />
      ))}
    </div>
  );
}
