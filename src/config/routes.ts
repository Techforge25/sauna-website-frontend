export const routes = {
  home: "/",
  about: "/about",
  whyUs: "/why-us",
  services: "/services",
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
  bookingCancel: (bookingId: string) => `/booking/manage/${bookingId}/cancel`,
  gallery: "/gallery",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  terms: "/terms-and-conditions",
  bookingRules: "/booking-rules",
} as const;

type RouteValue = (typeof routes)[keyof typeof routes];

export type AppRoute = Extract<RouteValue, string>;
