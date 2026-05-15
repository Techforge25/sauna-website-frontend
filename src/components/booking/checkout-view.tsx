"use client";

import { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheck,
  HiOutlineCalendarDays,
  HiOutlineClock,
} from "react-icons/hi2";

import { BookingStepper } from "@/components/booking/booking-stepper";
import { env } from "@/config/env";
import { routes } from "@/config/routes";
import {
  useBookingDraftStorage,
  useCreateBooking,
  useCreatePaymentSession,
  useServices,
  useTimeSlots,
} from "@/hooks";
import { clearBookingDraft } from "@/lib/booking/booking-draft-storage";
import {
  formatCurrency,
  formatDisplayDate,
  mockServices,
  mockTimeSlots,
} from "@/lib/booking/mock-booking-data";
import { cn } from "@/lib/utils/cn";
import { checkoutSchema } from "@/schemas/checkout";
import {
  setCurrentStep,
  setPaymentProvider,
  setPeopleCount,
} from "@/store/booking-flow-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { PaymentProvider, Service, TimeSlot } from "@/types";

type PaymentOption = {
  label: string;
  logo: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
  value: PaymentProvider;
};

const paymentOptions: PaymentOption[] = [
  {
    label: "Revolut",
    logo: {
      alt: "Revolut",
      height: 32,
      src: "/Images/payment/revolut.svg",
      width: 79,
    },
    value: "revolut",
  },
  {
    label: "Paypal",
    logo: {
      alt: "PayPal",
      height: 32,
      src: "/Images/payment/paypal.svg",
      width: 79,
    },
    value: "paypal",
  },
  {
    label: "Stripe",
    logo: {
      alt: "Stripe",
      height: 30,
      src: "/Images/payment/stripe.svg",
      width: 79,
    },
    value: "stripe",
  },
];

function getApiErrorMessage(error: unknown, fallback: string) {
  return isAxiosError(error) && typeof error.response?.data?.message === "string"
    ? error.response.data.message
    : fallback;
}

function getSelectedService(
  services: Service[],
  selectedServiceId: string | null,
) {
  return services.find((service) => service.id === selectedServiceId) ?? null;
}

function getSelectedSlot(slots: TimeSlot[], selectedSlotId: string | null) {
  return slots.find((slot) => slot.id === selectedSlotId) ?? null;
}

export function CheckoutView() {
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
  const peopleCount = useAppSelector((state) => state.bookingFlow.peopleCount);
  const paymentProvider = useAppSelector(
    (state) => state.bookingFlow.paymentProvider,
  );
  const isDraftRestored = useBookingDraftStorage();
  const [formError, setFormError] = useState<string | null>(null);
  const shouldFetch = !env.enableApiMocks;
  const servicesQuery = useServices(shouldFetch);
  const timeSlotsQuery = useTimeSlots(
    { date: selectedDate ?? "", serviceId: selectedServiceId ?? "" },
    shouldFetch,
  );
  const createBooking = useCreateBooking();
  const createPaymentSession = useCreatePaymentSession();
  const services = useMemo(
    () =>
      env.enableApiMocks
        ? mockServices
        : (servicesQuery.data ?? []).filter((service) => service.isActive),
    [servicesQuery.data],
  );
  const slots = useMemo(
    () => (env.enableApiMocks ? mockTimeSlots : (timeSlotsQuery.data ?? [])),
    [timeSlotsQuery.data],
  );
  const selectedService = getSelectedService(services, selectedServiceId);
  const selectedSlot = getSelectedSlot(slots, selectedSlotId);
  const activePaymentProvider = paymentProvider ?? "revolut";
  const isSharedService = selectedService?.slug.includes("shared") ?? true;
  const effectivePeopleCount = isSharedService ? peopleCount : 1;
  const totalPriceCents = selectedService
    ? selectedService.priceCents * effectivePeopleCount
    : 0;
  const isSubmitting =
    (!env.enableApiMocks && createBooking.isPending) ||
    (!env.enableApiMocks && createPaymentSession.isPending);

  useEffect(() => {
    dispatch(setCurrentStep("checkout"));
  }, [dispatch]);

  useEffect(() => {
    if (!paymentProvider) {
      dispatch(setPaymentProvider("revolut"));
    }
  }, [dispatch, paymentProvider]);

  useEffect(() => {
    if (!isDraftRestored) {
      return;
    }

    if (env.enableApiMocks && !customer) {
      router.replace(routes.bookingStart);
      return;
    }

    if (!selectedServiceId) {
      router.replace(routes.bookingNewService);
      return;
    }

    if (!selectedDate || !selectedSlotId) {
      router.replace(routes.bookingNewDateTime);
    }
  }, [
    customer,
    isDraftRestored,
    router,
    selectedDate,
    selectedServiceId,
    selectedSlotId,
  ]);

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(routes.bookingNewDateTime);
  }

  async function handleNext() {
    setFormError(null);

    const parsedCheckout = checkoutSchema.safeParse({
      paymentProvider: activePaymentProvider,
      peopleCount: effectivePeopleCount,
    });

    if (
      !parsedCheckout.success ||
      !selectedServiceId ||
      !selectedDate ||
      !selectedSlotId
    ) {
      setFormError("Complete booking details before continuing.");
      return;
    }

    dispatch(setPaymentProvider(activePaymentProvider));
    dispatch(setPeopleCount(effectivePeopleCount));

    if (env.enableApiMocks) {
      clearBookingDraft();
      router.replace(routes.bookingNewSuccess);
      return;
    }

    try {
      const booking = await createBooking.mutateAsync({
        peopleCount: effectivePeopleCount,
        selectedDate,
        selectedServiceId,
        selectedSlotId,
      });
      const paymentSession = await createPaymentSession.mutateAsync({
        bookingId: booking.id,
        paymentProvider: activePaymentProvider,
      });

      clearBookingDraft();
      window.location.href = paymentSession.redirectUrl;
    } catch (error) {
      setFormError(
        getApiErrorMessage(error, "Unable to start checkout. Please try again."),
      );
    }
  }

  if (
    !isDraftRestored ||
    (env.enableApiMocks && !customer) ||
    !selectedServiceId ||
    !selectedDate ||
    !selectedSlotId
  ) {
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

        <BookingStepper currentStep="checkout" title="Confirm Details" />

        <div className="flex w-full flex-col gap-8">
          <SelectedBookingCard
            isLoading={
              (servicesQuery.isLoading || timeSlotsQuery.isLoading) &&
              shouldFetch
            }
            peopleCount={effectivePeopleCount}
            selectedDate={selectedDate}
            selectedService={selectedService}
            selectedSlot={selectedSlot}
            totalPriceCents={totalPriceCents}
          />

          {isSharedService ? (
            <PeopleCountCard
              peopleCount={peopleCount}
              setPeopleCount={(value) => dispatch(setPeopleCount(value))}
            />
          ) : null}

          <PaymentMethodCard
            paymentProvider={activePaymentProvider}
            setPaymentProvider={(value) => dispatch(setPaymentProvider(value))}
          />

          {formError ? (
            <p className="text-sm leading-5 text-danger">{formError}</p>
          ) : null}

          <div className="flex w-full justify-end">
            <button
              className="inline-flex h-[47px] min-w-[102px] items-center justify-center gap-1 rounded-pill px-[22px] py-2.5 text-base font-normal leading-[22px] tracking-[-0.02em] text-white transition-opacity [background-image:var(--gradient-button)] hover:[background-image:var(--gradient-button-hover)] disabled:pointer-events-none disabled:opacity-60"
              disabled={!selectedService || !selectedSlot || isSubmitting}
              onClick={handleNext}
              type="button"
            >
              {isSubmitting ? "Processing..." : "Next"}
              <HiArrowRight aria-hidden="true" className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectedBookingCard({
  isLoading,
  peopleCount,
  selectedDate,
  selectedService,
  selectedSlot,
  totalPriceCents,
}: {
  isLoading: boolean;
  peopleCount: number;
  selectedDate: string;
  selectedService: Service | null;
  selectedSlot: TimeSlot | null;
  totalPriceCents: number;
}) {
  if (isLoading || !selectedService || !selectedSlot) {
    return (
      <div className="min-h-[236px] animate-pulse rounded-[16px] border border-border bg-white p-8">
        <div className="h-7 w-28 rounded bg-border" />
        <div className="mt-5 h-32 rounded-[12px] border border-border bg-white" />
      </div>
    );
  }

  return (
    <article className="flex flex-col items-start rounded-[16px] border border-border bg-white p-6 sm:p-8">
      <div className="flex w-full flex-col gap-4">
        <p className="text-[22px] font-semibold leading-6 text-primary">
          Selected
        </p>

        <div className="flex w-full flex-col gap-4 rounded-[12px] border border-border p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-4">
            <h2 className="font-serif text-[22px] font-semibold capitalize leading-9 text-foreground">
              {selectedService.title}
            </h2>
              <div className="flex shrink-0 items-center gap-2">
                <SelectedServiceMetaBadge>
                  {formatServiceType(selectedService.serviceType)}
                </SelectedServiceMetaBadge>
                <SelectedServiceMetaBadge>
                  {selectedService.durationMinutes}m
                </SelectedServiceMetaBadge>
              </div>
            </div>

            <div className="flex items-center gap-1 capitalize">
              <span className="text-[28px] font-bold leading-9 text-primary">
                {formatCurrency(totalPriceCents)}
              </span>
              <span className="text-base leading-9 text-[#ff7743]">
                /Session
              </span>
              {peopleCount > 1 ? (
                <span className="text-base leading-9 text-muted">
                  ({peopleCount} people)
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SummaryRow
              icon={<HiOutlineCalendarDays aria-hidden="true" />}
              label="Date"
              value={formatDisplayDate(selectedDate)}
            />
            <SummaryRow
              icon={<HiOutlineClock aria-hidden="true" />}
              label="Time"
              value={`${selectedSlot.startTime} - ${selectedSlot.endTime}`}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function SelectedServiceMetaBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex h-7 shrink-0 items-center justify-center rounded-pill border border-[#feede6] bg-[rgba(248,73,6,0.04)] px-[11px] font-semibold leading-[12px] tracking-[0.12em] text-primary"
      style={{ fontSize: 12 }}
    >
      {children}
    </span>
  );
}

function formatServiceType(serviceType: Service["serviceType"]) {
  return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
}

function SummaryRow({
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
        <span>{label}</span>
      </div>
      <span className="shrink-0 whitespace-nowrap text-foreground">{value}</span>
    </div>
  );
}

function PeopleCountCard({
  peopleCount,
  setPeopleCount,
}: {
  peopleCount: number;
  setPeopleCount: (value: number) => void;
}) {
  const bringPeople = peopleCount > 1;

  return (
    <section className="flex flex-col items-start rounded-[16px] border border-border bg-white p-6 sm:p-8">
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-[1.6] tracking-[-0.02em] text-foreground">
          Number of peoples
        </h2>

        <label className="flex cursor-pointer items-center gap-[7px]">
          <input
            checked={bringPeople}
            className="peer sr-only"
            onChange={(event) => setPeopleCount(event.target.checked ? 2 : 1)}
            type="checkbox"
          />
          <span className="flex size-6 items-center justify-center border border-border text-primary peer-checked:border-primary">
            {bringPeople ? <HiCheck aria-hidden="true" className="size-4" /> : null}
          </span>
          <span className="text-sm capitalize leading-[19px] text-muted">
            Bring People With Me
          </span>
        </label>

        {bringPeople ? (
          <div className="flex items-center gap-3">
            <button
              className="flex size-8 items-center justify-center rounded-full border border-border text-lg"
              disabled={peopleCount <= 2}
              onClick={() => setPeopleCount(Math.max(2, peopleCount - 1))}
              type="button"
            >
              -
            </button>
            <span className="min-w-8 text-center text-lg text-foreground">
              {peopleCount}
            </span>
            <button
              className="flex size-8 items-center justify-center rounded-full border border-border text-lg"
              onClick={() => setPeopleCount(peopleCount + 1)}
              type="button"
            >
              +
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function PaymentMethodCard({
  paymentProvider,
  setPaymentProvider,
}: {
  paymentProvider: PaymentProvider;
  setPaymentProvider: (value: PaymentProvider) => void;
}) {
  return (
    <section className="flex flex-col items-start rounded-[16px] border border-border bg-white p-6 sm:p-8">
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-[1.6] tracking-[-0.02em] text-foreground">
          Payment Method
        </h2>

        <div className="flex w-full flex-col gap-6">
          {paymentOptions.map((option) => {
            const isSelected = option.value === paymentProvider;

            return (
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border bg-white px-3 py-3 transition-colors",
                  isSelected ? "border-[#807e7e]" : "border-border",
                )}
                key={option.value}
                onClick={() => setPaymentProvider(option.value)}
                type="button"
              >
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded-full border p-1",
                      isSelected ? "border-primary" : "border-border",
                    )}
                  >
                    {isSelected ? (
                      <span className="size-2 rounded-full bg-primary" />
                    ) : null}
                  </span>
                  <span className="text-base leading-[1.6] tracking-[-0.02em] text-[#0e121b]">
                    {option.label}
                  </span>
                </span>

                <Image
                  alt={option.logo.alt}
                  className="h-auto object-contain"
                  height={option.logo.height}
                  src={option.logo.src}
                  width={option.logo.width}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
