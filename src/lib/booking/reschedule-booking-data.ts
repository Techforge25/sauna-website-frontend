import { formatDisplayDate } from "@/lib/booking/mock-booking-data";
import type { Booking } from "@/types";

export const mockCurrentBooking = {
  date: "2026-05-26",
  serviceId: "shared-50",
  serviceName: "50 Mins Shared Session",
  timeRange: "10:00 - 10:50",
};

export function getCurrentRescheduleSlot(booking?: Booking) {
  if (!booking) {
    return {
      dateLabel: formatDisplayDate(mockCurrentBooking.date),
      serviceId: mockCurrentBooking.serviceId,
      serviceName: mockCurrentBooking.serviceName,
      timeRange: mockCurrentBooking.timeRange,
    };
  }

  return {
    dateLabel: formatDisplayDate(booking.date),
    serviceId: booking.service.id,
    serviceName: booking.service.name,
    timeRange: `${booking.timeSlot.startTime} - ${booking.timeSlot.endTime}`,
  };
}
