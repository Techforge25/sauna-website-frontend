"use client";

import { useEffect, useState } from "react";

import {
  getBookingDraft,
  saveBookingDraft,
} from "@/lib/booking/booking-draft-storage";
import { hydrateBookingDraft } from "@/store/booking-flow-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function useBookingDraftStorage() {
  const dispatch = useAppDispatch();
  const paymentProvider = useAppSelector(
    (state) => state.bookingFlow.paymentProvider,
  );
  const peopleCount = useAppSelector((state) => state.bookingFlow.peopleCount);
  const selectedDate = useAppSelector(
    (state) => state.bookingFlow.selectedDate,
  );
  const selectedServiceId = useAppSelector(
    (state) => state.bookingFlow.selectedServiceId,
  );
  const selectedSlotId = useAppSelector(
    (state) => state.bookingFlow.selectedSlotId,
  );
  const [isDraftRestored, setIsDraftRestored] = useState(false);

  useEffect(() => {
    const storedDraft = getBookingDraft();

    if (storedDraft) {
      dispatch(hydrateBookingDraft(storedDraft));
    }

    const restoreTimer = window.setTimeout(() => {
      setIsDraftRestored(true);
    }, 0);

    return () => window.clearTimeout(restoreTimer);
  }, [dispatch]);

  useEffect(() => {
    if (!isDraftRestored) {
      return;
    }

    saveBookingDraft({
      paymentProvider,
      peopleCount,
      selectedDate,
      selectedServiceId,
      selectedSlotId,
    });
  }, [
    isDraftRestored,
    paymentProvider,
    peopleCount,
    selectedDate,
    selectedServiceId,
    selectedSlotId,
  ]);

  return isDraftRestored;
}
