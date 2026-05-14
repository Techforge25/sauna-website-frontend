import { useQuery } from "@tanstack/react-query";

import { getServices } from "@/services/services.service";

export function useServices(enabled = true) {
  return useQuery({
    enabled,
    queryFn: getServices,
    queryKey: ["services"],
  });
}
