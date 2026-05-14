const fallbackApiBaseUrl = "/api";

export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? fallbackApiBaseUrl,
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  enableApiMocks: process.env.NEXT_PUBLIC_ENABLE_API_MOCKS === "true",
  mockOtpCode: process.env.NEXT_PUBLIC_MOCK_OTP_CODE ?? "000000",
};
