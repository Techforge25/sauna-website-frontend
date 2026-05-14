import { useQuery } from "@tanstack/react-query";

import { getBooking } from "@/services/bookings.service";

export function useBooking(bookingId: string, enabled = true) {
  return useQuery({
    enabled: enabled && Boolean(bookingId),
    queryFn: () => getBooking(bookingId),
    queryKey: ["booking", bookingId],
  });
}
