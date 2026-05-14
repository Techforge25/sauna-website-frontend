import { apiRoutes } from "@/config/api";
import { apiClient } from "@/lib/api/client";
import type {
  CreatePaymentSessionPayload,
  PaymentSession,
} from "@/types/payment";

export async function createPaymentSession(
  payload: CreatePaymentSessionPayload,
) {
  const response = await apiClient.post<PaymentSession>(
    apiRoutes.payments.createSession,
    payload,
  );

  return response.data;
}
