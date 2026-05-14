"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

import { BookingStepper } from "@/components/booking/booking-stepper";
import { env } from "@/config/env";
import { routes } from "@/config/routes";
import { useBookingDraftStorage, useServices } from "@/hooks";
import { formatCurrency, mockServices } from "@/lib/booking/mock-booking-data";
import { cn } from "@/lib/utils/cn";
import {
  setCurrentStep,
  setSelectedServiceId,
} from "@/store/booking-flow-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Service } from "@/types";

export function ServiceSelectionView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const customer = useAppSelector((state) => state.bookingFlow.customer);
  const selectedServiceId = useAppSelector(
    (state) => state.bookingFlow.selectedServiceId,
  );
  const isDraftRestored = useBookingDraftStorage();
  const shouldFetchServices = !env.enableApiMocks;
  const servicesQuery = useServices(shouldFetchServices);
  const services = useMemo(
    () =>
      env.enableApiMocks
        ? mockServices
        : (servicesQuery.data ?? []).filter((service) => service.isActive),
    [servicesQuery.data],
  );
  const activeServiceId = selectedServiceId ?? services[0]?.id ?? null;

  useEffect(() => {
    dispatch(setCurrentStep("service"));
  }, [dispatch]);

  useEffect(() => {
    if (!isDraftRestored) {
      return;
    }

    if (env.enableApiMocks && !customer) {
      router.replace(routes.bookingStart);
    }
  }, [customer, isDraftRestored, router]);

  useEffect(() => {
    if (!isDraftRestored) {
      return;
    }

    if (!selectedServiceId && services[0]) {
      dispatch(setSelectedServiceId(services[0].id));
    }
  }, [dispatch, isDraftRestored, selectedServiceId, services]);

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(routes.bookingMyBookings);
  }

  function handleNext() {
    if (!activeServiceId) {
      return;
    }

    dispatch(setSelectedServiceId(activeServiceId));
    router.push(routes.bookingNewDateTime);
  }

  if (!isDraftRestored || (env.enableApiMocks && !customer)) {
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

        <BookingStepper currentStep="service" />

        <div className="flex w-full flex-col items-start gap-8">
          <div className="flex w-full flex-col gap-8">
            {servicesQuery.isLoading && shouldFetchServices ? (
              <ServiceCardSkeleton />
            ) : null}

            {services.map((service) => (
              <ServiceSelectionCard
                isSelected={service.id === activeServiceId}
                key={service.id}
                onSelect={() => dispatch(setSelectedServiceId(service.id))}
                service={service}
              />
            ))}
          </div>

          {servicesQuery.isError && shouldFetchServices ? (
            <p className="text-sm leading-5 text-danger">
              Unable to load services. Please try again.
            </p>
          ) : null}

          <div className="flex w-full justify-end">
            <button
              className="inline-flex h-[47px] min-w-[102px] items-center justify-center gap-1 rounded-pill px-[22px] py-2.5 text-base font-normal leading-[22px] tracking-[-0.02em] text-white transition-opacity [background-image:var(--gradient-button)] hover:[background-image:var(--gradient-button-hover)] disabled:pointer-events-none disabled:opacity-60"
              disabled={!activeServiceId}
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

function ServiceSelectionCard({
  isSelected,
  onSelect,
  service,
}: {
  isSelected: boolean;
  onSelect: () => void;
  service: Service;
}) {
  const isPrivate = service.slug.includes("private");
  const priceColor = isPrivate ? "text-primary-dark" : "text-primary";
  const priceUnitColor = isPrivate ? "text-[#826357]" : "text-[#ff7743]";

  return (
    <button
      aria-pressed={isSelected}
      className={cn(
        "flex w-full flex-col items-start overflow-hidden rounded-[16px] border bg-white p-6 text-left transition-all sm:p-8",
        isSelected
          ? "border-primary shadow-[0px_6px_15px_0px_rgba(87,43,4,0.15)]"
          : "border-border hover:border-primary/70",
      )}
      onClick={onSelect}
      type="button"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-start justify-between gap-4">
            <h2 className="font-serif text-[22px] font-semibold capitalize leading-9 text-foreground">
              {service.title}
            </h2>
            <span className="flex h-7 shrink-0 items-center justify-center rounded-pill border border-[#feede6] bg-[rgba(248,73,6,0.04)] px-[11px] text-base font-semibold lowercase leading-[22px] tracking-[0.12em] text-primary">
              {service.durationMinutes}m
            </span>
          </div>

          <div className="flex items-center gap-1 capitalize">
            <span className={cn("text-[28px] font-bold leading-9", priceColor)}>
              {formatCurrency(service.priceCents)}
            </span>
            <span className={cn("text-base leading-9", priceUnitColor)}>
              /{service.priceUnit}
            </span>
          </div>
        </div>

        <p className="text-lg font-normal leading-6 text-muted">
          {service.description}
        </p>
      </div>
    </button>
  );
}

function ServiceCardSkeleton() {
  return (
    <div className="min-h-[168px] animate-pulse rounded-[16px] border border-border bg-white p-8">
      <div className="h-8 w-72 max-w-full rounded bg-border" />
      <div className="mt-4 h-8 w-24 rounded bg-border" />
      <div className="mt-5 h-5 w-full rounded bg-border" />
      <div className="mt-2 h-5 w-3/4 rounded bg-border" />
    </div>
  );
}
