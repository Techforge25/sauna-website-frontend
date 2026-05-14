import { useQuery } from "@tanstack/react-query";

import {
  getTimeSlots,
  type GetTimeSlotsParams,
} from "@/services/bookings.service";

export function useTimeSlots(params: GetTimeSlotsParams) {
  return useQuery({
    enabled: Boolean(params.serviceId && params.date),
    queryFn: () => getTimeSlots(params),
    queryKey: ["time-slots", params.serviceId, params.date],
  });
}
