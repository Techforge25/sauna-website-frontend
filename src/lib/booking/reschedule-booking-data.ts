import { formatDisplayDate } from "@/lib/booking/mock-booking-data";
import type { Booking, SaunaService } from "@/types";

type MockRescheduleBooking = {
  date: string;
  durationMinutes: number;
  serviceId: string;
  serviceName: string;
  serviceType: SaunaService["serviceType"];
  timeRange: string;
};

const defaultMockBookingId = "mock-shared-session";

export const mockRescheduleBookings: Record<string, MockRescheduleBooking> = {
  "mock-private-session": {
    date: "2026-05-31",
    durationMinutes: 50,
    serviceId: "private-50",
    serviceName: "50 Min Private Sauna Session",
    serviceType: "private",
    timeRange: "11:00 - 11:50",
  },
  [defaultMockBookingId]: {
    date: "2026-05-26",
    durationMinutes: 50,
    serviceId: "shared-50",
    serviceName: "50 Mins Shared Session",
    serviceType: "shared",
    timeRange: "10:00 - 10:50",
  },
};

export const mockCurrentBooking = mockRescheduleBookings[defaultMockBookingId];

function resolveMockBooking(bookingId?: string) {
  return bookingId
    ? (mockRescheduleBookings[bookingId] ?? mockCurrentBooking)
    : mockCurrentBooking;
}

export function getCurrentRescheduleSlot(booking?: Booking, bookingId?: string) {
  if (!booking) {
    const mockBooking = resolveMockBooking(bookingId);

    return {
      dateLabel: formatDisplayDate(mockBooking.date),
      durationMinutes: mockBooking.durationMinutes,
      serviceId: mockBooking.serviceId,
      serviceName: mockBooking.serviceName,
      serviceType: mockBooking.serviceType,
      timeRange: mockBooking.timeRange,
    };
  }

  return {
    dateLabel: formatDisplayDate(booking.date),
    durationMinutes: booking.service.durationMinutes,
    serviceId: booking.service.id,
    serviceName: booking.service.name,
    serviceType: booking.service.serviceType,
    timeRange: `${booking.timeSlot.startTime} - ${booking.timeSlot.endTime}`,
  };
}
