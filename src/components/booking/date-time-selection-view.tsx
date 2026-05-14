"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { HiArrowLeft, HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import { BookingStepper } from "@/components/booking/booking-stepper";
import { env } from "@/config/env";
import { routes } from "@/config/routes";
import { useTimeSlots } from "@/hooks";
import { cn } from "@/lib/utils/cn";
import {
  setCurrentStep,
  setSelectedDate,
  setSelectedSlotId,
} from "@/store/booking-flow-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { TimeSlot } from "@/types";

type CalendarDay = {
  date: string;
  day: number;
  isAvailable: boolean;
};

const weekdays = ["Mon", "Tue", "Wed", "Thus", "Fri", "Sat", "Sun"];
const defaultSelectedDate = "2026-05-12";

const calendarDays: CalendarDay[] = [
  { date: "2026-05-01", day: 1, isAvailable: false },
  { date: "2026-05-02", day: 2, isAvailable: true },
  { date: "2026-05-03", day: 3, isAvailable: false },
  { date: "2026-05-04", day: 4, isAvailable: false },
  { date: "2026-05-05", day: 5, isAvailable: true },
  { date: "2026-05-06", day: 6, isAvailable: true },
  { date: "2026-05-07", day: 7, isAvailable: true },
  { date: "2026-05-08", day: 8, isAvailable: false },
  { date: "2026-05-09", day: 9, isAvailable: true },
  { date: "2026-05-10", day: 10, isAvailable: true },
  { date: "2026-05-11", day: 11, isAvailable: true },
  { date: "2026-05-12", day: 12, isAvailable: true },
  { date: "2026-05-13", day: 13, isAvailable: false },
  { date: "2026-05-14", day: 14, isAvailable: false },
  { date: "2026-05-15", day: 15, isAvailable: false },
  { date: "2026-05-16", day: 16, isAvailable: false },
  { date: "2026-05-17", day: 17, isAvailable: false },
  { date: "2026-05-18", day: 18, isAvailable: true },
  { date: "2026-05-19", day: 19, isAvailable: true },
  { date: "2026-05-20", day: 20, isAvailable: true },
  { date: "2026-05-21", day: 21, isAvailable: false },
  { date: "2026-05-22", day: 22, isAvailable: true },
  { date: "2026-05-23", day: 23, isAvailable: false },
  { date: "2026-05-24", day: 24, isAvailable: true },
  { date: "2026-05-25", day: 25, isAvailable: false },
  { date: "2026-05-26", day: 26, isAvailable: true },
  { date: "2026-05-27", day: 27, isAvailable: false },
  { date: "2026-05-28", day: 28, isAvailable: true },
  { date: "2026-05-29", day: 29, isAvailable: false },
  { date: "2026-05-30", day: 30, isAvailable: true },
  { date: "2026-05-31", day: 31, isAvailable: true },
];

const mockTimeSlots: TimeSlot[] = [
  { endTime: "08:50", id: "08-00", isAvailable: true, startTime: "08:00" },
  { endTime: "09:50", id: "09-00", isAvailable: true, startTime: "09:00" },
  { endTime: "10:50", id: "10-00", isAvailable: true, startTime: "10:00" },
  { endTime: "12:50", id: "12-00", isAvailable: true, startTime: "12:00" },
  { endTime: "13:50", id: "13-00", isAvailable: true, startTime: "13:00" },
  { endTime: "14:50", id: "14-00", isAvailable: false, startTime: "14:00" },
  { endTime: "15:50", id: "15-00", isAvailable: false, startTime: "15:00" },
  { endTime: "16:50", id: "16-00", isAvailable: true, startTime: "16:00" },
  { endTime: "17:50", id: "17-00", isAvailable: true, startTime: "17:00" },
];

function formatSelectedDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

export function DateTimeSelectionView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const customer = useAppSelector((state) => state.bookingFlow.customer);
  const selectedServiceId = useAppSelector(
    (state) => state.bookingFlow.selectedServiceId,
  );
  const selectedDate = useAppSelector(
    (state) => state.bookingFlow.selectedDate,
  );
  const selectedSlotId = useAppSelector(
    (state) => state.bookingFlow.selectedSlotId,
  );
  const activeDate = selectedDate ?? defaultSelectedDate;
  const shouldFetchSlots = !env.enableApiMocks;
  const timeSlotsQuery = useTimeSlots(
    { date: activeDate, serviceId: selectedServiceId ?? "" },
    shouldFetchSlots,
  );
  const timeSlots = useMemo(
    () => (env.enableApiMocks ? mockTimeSlots : (timeSlotsQuery.data ?? [])),
    [timeSlotsQuery.data],
  );
  const activeSlotId =
    selectedSlotId ?? timeSlots.find((slot) => slot.isAvailable)?.id ?? null;

  useEffect(() => {
    dispatch(setCurrentStep("date-time"));
  }, [dispatch]);

  useEffect(() => {
    if (env.enableApiMocks && !customer) {
      router.replace(routes.bookingStart);
      return;
    }

    if (!selectedServiceId) {
      router.replace(routes.bookingNewService);
    }
  }, [customer, router, selectedServiceId]);

  useEffect(() => {
    if (!selectedDate) {
      dispatch(setSelectedDate(defaultSelectedDate));
    }
  }, [dispatch, selectedDate]);

  useEffect(() => {
    if (!selectedSlotId && activeSlotId) {
      dispatch(setSelectedSlotId(activeSlotId));
    }
  }, [activeSlotId, dispatch, selectedSlotId]);

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(routes.bookingNewService);
  }

  function handleNext() {
    if (!activeDate || !activeSlotId) {
      return;
    }

    dispatch(setSelectedDate(activeDate));
    dispatch(setSelectedSlotId(activeSlotId));
    router.push(routes.bookingNewCheckout);
  }

  if ((env.enableApiMocks && !customer) || !selectedServiceId) {
    return null;
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

        <BookingStepper currentStep="date-time" />

        <div className="flex w-full flex-col gap-8">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
            <CalendarPanel activeDate={activeDate} />
            <TimeSlotsPanel
              activeSlotId={activeSlotId}
              isLoading={timeSlotsQuery.isLoading && shouldFetchSlots}
              selectedDate={activeDate}
              slots={timeSlots}
            />
          </div>

          {timeSlotsQuery.isError && shouldFetchSlots ? (
            <p className="text-sm leading-5 text-danger">
              Unable to load time slots. Please try again.
            </p>
          ) : null}

          <div className="flex w-full justify-end">
            <button
              className="inline-flex h-[47px] min-w-[102px] items-center justify-center gap-1 rounded-pill px-[22px] py-2.5 text-base font-normal leading-[22px] tracking-[-0.02em] text-white transition-opacity [background-image:var(--gradient-button)] hover:[background-image:var(--gradient-button-hover)] disabled:pointer-events-none disabled:opacity-60"
              disabled={!activeDate || !activeSlotId}
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

function CalendarPanel({ activeDate }: { activeDate: string }) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-8 rounded-[16px] border border-[#d8dee8] bg-white p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-[22px] font-semibold capitalize leading-7 text-foreground">
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
          const isSelected = day.date === activeDate;

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
              onClick={() => {
                dispatch(setSelectedDate(day.date));
                dispatch(setSelectedSlotId(null));
              }}
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

function TimeSlotsPanel({
  activeSlotId,
  isLoading,
  selectedDate,
  slots,
}: {
  activeSlotId: string | null;
  isLoading: boolean;
  selectedDate: string;
  slots: TimeSlot[];
}) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex min-h-[430px] flex-col gap-8 rounded-[16px] border border-[#d8dee8] bg-white p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-8">
      <h2 className="font-serif text-[22px] font-semibold leading-7 text-foreground">
        {formatSelectedDate(selectedDate)}
      </h2>

      {isLoading ? (
        <TimeSlotSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {slots.map((slot) => {
            const isSelected = slot.id === activeSlotId;

            return (
              <button
                className={cn(
                  "flex items-center gap-[9px] rounded-[12px] border p-3 text-center text-lg leading-[22px] transition-colors",
                  slot.isAvailable &&
                    !isSelected &&
                    "border-border bg-white text-foreground hover:border-primary",
                  !slot.isAvailable &&
                    "cursor-not-allowed border-transparent bg-[#dddddd] text-[#807e7e]",
                  isSelected && "border-primary bg-primary-light text-foreground",
                )}
                disabled={!slot.isAvailable}
                key={slot.id}
                onClick={() => dispatch(setSelectedSlotId(slot.id))}
                type="button"
              >
                <span className="min-w-0 flex-1">{slot.startTime}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    slot.isAvailable ? "bg-foreground" : "bg-[#807e7e]",
                  )}
                />
                <span className="min-w-0 flex-1">{slot.endTime}</span>
              </button>
            );
          })}
        </div>
      )}
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
