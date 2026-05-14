import type { PaymentProvider } from "@/types/booking";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "succeeded"
  | "failed"
  | "cancelled";

export type PaymentSession = {
  id: string;
  paymentProvider: PaymentProvider;
  redirectUrl: string;
  status: PaymentStatus;
};

export type CreatePaymentSessionPayload = {
  bookingId: string;
  paymentProvider: PaymentProvider;
};
