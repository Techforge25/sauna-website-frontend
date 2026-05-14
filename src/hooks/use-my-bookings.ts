import { useQuery } from "@tanstack/react-query";

import { getMyBookings } from "@/services/bookings.service";

export function useMyBookings() {
  return useQuery({
    queryFn: getMyBookings,
    queryKey: ["my-bookings"],
  });
}
