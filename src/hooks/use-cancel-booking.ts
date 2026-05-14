import { useMutation } from "@tanstack/react-query";

import type { CancellationInput } from "@/schemas/cancellation";
import { createCancellationRequest } from "@/services/cancellations.service";

type CancelBookingMutationInput = {
  bookingId: string;
  payload: CancellationInput;
};

export function useCancelBooking() {
  return useMutation({
    mutationFn: ({ bookingId, payload }: CancelBookingMutationInput) =>
      createCancellationRequest(bookingId, payload),
  });
}
