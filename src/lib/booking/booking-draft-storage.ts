import type { BookingDraftState } from "@/store/booking-flow-slice";

const bookingDraftStorageKey = "sauna.bookingDraft";

function isPaymentProvider(value: unknown) {
  return value === "stripe" || value === "paypal" || value === "revolut";
}

function isNullableString(value: unknown) {
  return typeof value === "string" || value === null;
}

function normalizeBookingDraft(value: unknown): BookingDraftState | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const draft = value as Partial<BookingDraftState>;

  if (
    !isNullableString(draft.selectedServiceId) ||
    !isNullableString(draft.selectedDate) ||
    !isNullableString(draft.selectedSlotId)
  ) {
    return null;
  }

  return {
    paymentProvider: isPaymentProvider(draft.paymentProvider)
      ? draft.paymentProvider
      : null,
    peopleCount:
      typeof draft.peopleCount === "number" && draft.peopleCount > 0
        ? draft.peopleCount
        : 1,
    selectedDate: draft.selectedDate,
    selectedServiceId: draft.selectedServiceId,
    selectedSlotId: draft.selectedSlotId,
  };
}

function canUseSessionStorage() {
  return typeof window !== "undefined" && Boolean(window.sessionStorage);
}

export function getBookingDraft() {
  if (!canUseSessionStorage()) {
    return null;
  }

  try {
    const storedDraft = window.sessionStorage.getItem(bookingDraftStorageKey);

    if (!storedDraft) {
      return null;
    }

    return normalizeBookingDraft(JSON.parse(storedDraft));
  } catch {
    return null;
  }
}

export function saveBookingDraft(draft: BookingDraftState) {
  if (!canUseSessionStorage()) {
    return;
  }

  window.sessionStorage.setItem(bookingDraftStorageKey, JSON.stringify(draft));
}

export function clearBookingDraft() {
  if (!canUseSessionStorage()) {
    return;
  }

  window.sessionStorage.removeItem(bookingDraftStorageKey);
}
