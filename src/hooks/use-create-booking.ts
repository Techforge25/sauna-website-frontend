import { useMutation } from "@tanstack/react-query";

import { createBooking } from "@/services/bookings.service";

export function useCreateBooking() {
  return useMutation({
    mutationFn: createBooking,
  });
}
