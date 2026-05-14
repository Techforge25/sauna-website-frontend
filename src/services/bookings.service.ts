import { apiRoutes } from "@/config/api";
import { apiClient } from "@/lib/api/client";
import type { NewBookingInput } from "@/schemas/new-booking";
import type { Booking, BookingSummary, TimeSlot } from "@/types";

export type GetTimeSlotsParams = {
  date: string;
  serviceId: string;
};

export type CreateBookingPayload = NewBookingInput & {
  peopleCount: number;
};

export type RescheduleBookingPayload = {
  selectedDate: string;
  selectedSlotId: string;
};

export async function getMyBookings() {
  const response = await apiClient.get<BookingSummary[]>(apiRoutes.bookings.list);

  return response.data;
}

export async function getBooking(bookingId: string) {
  const response = await apiClient.get<Booking>(
    apiRoutes.bookings.details(bookingId),
  );

  return response.data;
}

export async function getTimeSlots(params: GetTimeSlotsParams) {
  const response = await apiClient.get<TimeSlot[]>(apiRoutes.calendly.availability, {
    params,
  });

  return response.data;
}

export async function createBooking(payload: CreateBookingPayload) {
  const response = await apiClient.post<Booking>(
    apiRoutes.bookings.create,
    payload,
  );

  return response.data;
}

export async function rescheduleBooking(
  bookingId: string,
  payload: RescheduleBookingPayload,
) {
  const response = await apiClient.post<Booking>(
    apiRoutes.bookings.reschedule(bookingId),
    payload,
  );

  return response.data;
}
