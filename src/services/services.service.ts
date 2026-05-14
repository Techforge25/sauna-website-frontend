import { apiRoutes } from "@/config/api";
import { apiClient } from "@/lib/api/client";
import type { Service } from "@/types";

export async function getServices() {
  const response = await apiClient.get<Service[]>(apiRoutes.services.list);

  return response.data;
}

export async function getService(serviceId: string) {
  const response = await apiClient.get<Service>(
    apiRoutes.services.details(serviceId),
  );

  return response.data;
}
