import { useMutation } from "@tanstack/react-query";

import {
  rescheduleBooking,
  type RescheduleBookingPayload,
} from "@/services/bookings.service";

type RescheduleBookingMutationInput = {
  bookingId: string;
  payload: RescheduleBookingPayload;
};

export function useRescheduleBooking() {
  return useMutation({
    mutationFn: ({ bookingId, payload }: RescheduleBookingMutationInput) =>
      rescheduleBooking(bookingId, payload),
  });
}
