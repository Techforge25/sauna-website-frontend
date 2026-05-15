import { formatDisplayDate } from "@/lib/booking/mock-booking-data";
import type { Booking } from "@/types";

export const mockCurrentBooking = {
  date: "2026-05-26",
  durationMinutes: 50,
  serviceId: "shared-50",
  serviceName: "50 Mins Shared Session",
  serviceType: "shared" as const,
  timeRange: "10:00 - 10:50",
};

export function getCurrentRescheduleSlot(booking?: Booking) {
  if (!booking) {
    return {
      dateLabel: formatDisplayDate(mockCurrentBooking.date),
      durationMinutes: mockCurrentBooking.durationMinutes,
      serviceId: mockCurrentBooking.serviceId,
      serviceName: mockCurrentBooking.serviceName,
      serviceType: mockCurrentBooking.serviceType,
      timeRange: mockCurrentBooking.timeRange,
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
