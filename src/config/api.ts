export const apiRoutes = {
  otp: {
    request: "/otp/request",
    verify: "/otp/verify",
  },
  bookings: {
    create: "/bookings",
    details: (bookingId: string) => `/bookings/${bookingId}`,
    list: "/bookings",
    reschedule: (bookingId: string) => `/bookings/${bookingId}/reschedule`,
  },
  cancellations: {
    create: (bookingId: string) => `/bookings/${bookingId}/cancel-request`,
  },
  services: {
    details: (serviceId: string) => `/services/${serviceId}`,
    list: "/services",
  },
  payments: {
    createSession: "/payments/session",
    verify: "/payments/verify",
  },
  calendly: {
    availability: "/availability",
    createEvent: "/calendly/create-event",
    rescheduleEvent: "/calendly/reschedule-event",
    cancelEvent: "/calendly/cancel-event",
  },
} as const;
