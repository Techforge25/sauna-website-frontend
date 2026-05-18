export const routes = {
  home: "/",
  about: "/about",
  whyUs: "/why-us",
  services: "/services",

  // Booking Flow
  bookingStart: "/booking/start",
  bookingVerifyOtp: "/booking/verify-otp",
  bookingMyBookings: "/booking/my-bookings",
  bookingNewService: "/booking/new/service",
  bookingNewDateTime: "/booking/new/date-time",
  bookingNewCheckout: "/booking/new/checkout",
  bookingNewSuccess: "/booking/new/success",
  bookingManage: (bookingId: string) => `/booking/manage/${bookingId}`,
  bookingReschedule: (bookingId: string) =>
    `/booking/manage/${bookingId}/reschedule`,
  bookingRescheduleConfirmation: (bookingId: string) =>
    `/booking/manage/${bookingId}/reschedule/confirmation`,
  bookingCancel: (bookingId: string) => `/booking/manage/${bookingId}/cancel`,
  bookingCancelSubmitted: (bookingId: string) =>
    `/booking/manage/${bookingId}/cancel/submitted`,


  gallery: "/gallery",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  terms: "/terms-and-conditions",
  bookingRules: "/booking-rules",
} as const;

type RouteValue = (typeof routes)[keyof typeof routes];

export type AppRoute = Extract<RouteValue, string>;
