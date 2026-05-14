import { apiRoutes } from "@/config/api";
import { apiClient } from "@/lib/api/client";
import type { BookingAccessInput } from "@/schemas/booking-access";
import type { OtpInput } from "@/schemas/otp";

export type RequestOtpResponse = {
  expiresInSeconds: number;
  message: string;
};

export type VerifyOtpResponse = {
  expiresAt: string;
  message: string;
};

export async function requestOtp(payload: BookingAccessInput) {
  const response = await apiClient.post<RequestOtpResponse>(
    apiRoutes.otp.request,
    payload,
  );

  return response.data;
}

export async function verifyOtp(payload: OtpInput) {
  const response = await apiClient.post<VerifyOtpResponse>(
    apiRoutes.otp.verify,
    payload,
  );

  return response.data;
}
