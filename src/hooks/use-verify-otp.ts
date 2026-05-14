import { useMutation } from "@tanstack/react-query";

import { verifyOtp } from "@/services/otp.service";

export function useVerifyOtp() {
  return useMutation({
    mutationFn: verifyOtp,
  });
}
