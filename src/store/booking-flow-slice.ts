import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { BookingAccessInput } from "@/schemas/booking-access";
import type { PaymentProvider } from "@/types";

export type BookingStep = "service" | "date-time" | "checkout" | "success";

type BookingFlowState = {
  currentStep: BookingStep;
  customer: BookingAccessInput | null;
  paymentProvider: PaymentProvider | null;
  peopleCount: number;
  selectedDate: string | null;
  selectedServiceId: string | null;
  selectedSlotId: string | null;
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
