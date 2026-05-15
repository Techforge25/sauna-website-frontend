"use client";

import { useEffect } from "react";
import { HiCheckCircle, HiOutlineCalendarDays, HiOutlineClock, HiOutlineKey } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { clearBookingDraft } from "@/lib/booking/booking-draft-storage";
import { clearBookingDraftState } from "@/store/booking-flow-slice";
import { useAppDispatch } from "@/store/hooks";

const bookingDetails = [
  {
    icon: <HiOutlineKey aria-hidden="true" />,
    label: "Access Code",
    value: "BMA-749-291",
  },
  {
    icon: <HiOutlineCalendarDays aria-hidden="true" />,
    label: "Date",
    value: "May 26, 2026",
  },
  {
    icon: <HiOutlineClock aria-hidden="true" />,
    label: "Time",
    value: "10:00 - 10:50",
  },
];

export function BookingSuccessView() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    clearBookingDraft();
    dispatch(clearBookingDraftState());
  }, [dispatch]);

  return (
    <section className="bg-background px-5 pb-[100px] pt-8 sm:px-8 lg:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center">
        <div className="flex w-full max-w-[720px] flex-col items-center gap-8 rounded-[16px] border border-border bg-white p-6 text-center shadow-[0px_6px_15px_rgba(87,43,4,0.08)] sm:p-8 lg:p-12">
          <span className="flex size-16 items-center justify-center rounded-full bg-primary-light text-primary">
            <HiCheckCircle aria-hidden="true" className="size-11" />
          </span>

          <div className="flex flex-col items-center gap-3">
            <h1 className="font-serif text-[32px] font-medium leading-tight text-foreground sm:text-[36px] sm:leading-[46px]">
              Booking Confirmed
            </h1>
            <p className="max-w-[540px] text-lg leading-6 text-muted">
              Your sauna session has been booked. Your access code has been sent
              to your email.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-[16px] border border-border bg-white p-4 text-left">
            <h2 className="font-serif text-[22px] font-semibold capitalize leading-7 text-foreground">
              50 Mins Shared Session
            </h2>

            <div className="flex flex-col gap-3">
              {bookingDetails.map((detail) => (
                <div
                  className="flex items-center gap-5 text-base leading-5 sm:gap-[49px]"
                  key={detail.label}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-1.5 text-muted">
                    <span className="flex size-[18px] shrink-0 items-center justify-center text-lg">
                      {detail.icon}
                    </span>
                    <span className="whitespace-nowrap">{detail.label}</span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-foreground">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Button
            href={routes.bookingMyBookings}
            replace
          >
            Your Bookings
          </Button>
        </div>
      </div>
    </section>
  );
}
