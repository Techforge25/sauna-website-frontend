import { useQuery } from "@tanstack/react-query";

import { getMyBookings } from "@/services/bookings.service";

export function useMyBookings(enabled = true) {
  return useQuery({
    enabled,
    queryFn: getMyBookings,
    queryKey: ["my-bookings"],
  });
}
