import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { BookingAccessInput } from "@/schemas/booking-access";
import type { PaymentProvider } from "@/types";

export type BookingStep = "service" | "date-time" | "checkout" | "success";

export type BookingDraftState = {
  paymentProvider: PaymentProvider | null;
  peopleCount: number;
  selectedDate: string | null;
  selectedServiceId: string | null;
  selectedSlotId: string | null;
};

type BookingFlowState = BookingDraftState & {
  currentStep: BookingStep;
  customer: BookingAccessInput | null;
};

const initialState: BookingFlowState = {
  currentStep: "service",
  customer: null,
  paymentProvider: null,
  peopleCount: 1,
  selectedDate: null,
  selectedServiceId: null,
  selectedSlotId: null,
};

const bookingFlowSlice = createSlice({
  initialState,
  name: "bookingFlow",
  reducers: {
    hydrateBookingDraft: (
      state,
      action: PayloadAction<Partial<BookingDraftState>>,
    ) => {
      if (action.payload.paymentProvider !== undefined) {
        state.paymentProvider = action.payload.paymentProvider;
      }

      if (typeof action.payload.peopleCount === "number") {
        state.peopleCount = Math.max(1, action.payload.peopleCount);
      }

      if (action.payload.selectedDate !== undefined) {
        state.selectedDate = action.payload.selectedDate;
      }

      if (action.payload.selectedServiceId !== undefined) {
        state.selectedServiceId = action.payload.selectedServiceId;
      }

      if (action.payload.selectedSlotId !== undefined) {
        state.selectedSlotId = action.payload.selectedSlotId;
      }
    },
    clearBookingDraftState: (state) => {
      state.currentStep = "service";
      state.paymentProvider = null;
      state.peopleCount = 1;
      state.selectedDate = null;
      state.selectedServiceId = null;
      state.selectedSlotId = null;
    },
    resetBookingFlow: () => initialState,
    setCurrentStep: (state, action: PayloadAction<BookingStep>) => {
      state.currentStep = action.payload;
    },
    setCustomer: (
      state,
      action: PayloadAction<BookingFlowState["customer"]>,
    ) => {
      state.customer = action.payload;
    },
    setPaymentProvider: (
      state,
      action: PayloadAction<BookingFlowState["paymentProvider"]>,
    ) => {
      state.paymentProvider = action.payload;
    },
    setPeopleCount: (state, action: PayloadAction<number>) => {
      state.peopleCount = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setSelectedServiceId: (state, action: PayloadAction<string | null>) => {
      state.selectedServiceId = action.payload;
    },
    setSelectedSlotId: (state, action: PayloadAction<string | null>) => {
      state.selectedSlotId = action.payload;
    },
  },
});

export const {
  clearBookingDraftState,
  hydrateBookingDraft,
  resetBookingFlow,
  setCurrentStep,
  setCustomer,
  setPaymentProvider,
  setPeopleCount,
  setSelectedDate,
  setSelectedServiceId,
  setSelectedSlotId,
} = bookingFlowSlice.actions;

export const bookingFlowReducer = bookingFlowSlice.reducer;
