export type BookingStatus =
  | "pending-payment"
  | "confirmed"
  | "rescheduled"
  | "cancellation-requested"
  | "cancelled"
  | "pending-refund"
  | "refunded"
  | "expired";

export type PaymentProvider = "stripe" | "paypal" | "revolut";

export type BookingCustomer = {
  email: string;
  id: string;
  name: string;
  phone: string;
};

export type TimeSlot = {
  endTime: string;
  id: string;
  isAvailable: boolean;
  startTime: string;
};

export type BookingDraft = {
  paymentProvider: PaymentProvider | null;
  peopleCount: number;
  selectedDate: string | null;
  selectedServiceId: string | null;
  selectedSlotId: string | null;
};

export type SaunaService = {
  currency: "EUR";
  description: string;
  durationMinutes: number;
  id: string;
  name: string;
  priceCents: number;
  serviceType: "shared" | "private";
};

export type Booking = {
  accessCode?: string;
  createdAt: string;
  currency: "EUR";
  customer: BookingCustomer;
  date: string;
  id: string;
  peopleCount: number;
  service: SaunaService;
  status: BookingStatus;
  timeSlot: TimeSlot;
  totalPriceCents: number;
  updatedAt: string;
};

export type BookingSummary = {
  accessCode?: string;
  date: string;
  id: string;
  serviceName: string;
  status: BookingStatus;
  timeRange: string;
  totalPriceCents?: number;
};
