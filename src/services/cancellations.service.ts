import { apiRoutes } from "@/config/api";
import { apiClient } from "@/lib/api/client";
import type { CancellationInput } from "@/schemas/cancellation";
import type { CancellationRequest } from "@/types/cancellation";

export async function createCancellationRequest(
  bookingId: string,
  payload: CancellationInput,
) {
  const response = await apiClient.post<CancellationRequest>(
    apiRoutes.cancellations.create(bookingId),
    payload,
  );

  return response.data;
}
