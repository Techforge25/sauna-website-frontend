import { useMutation } from "@tanstack/react-query";

import { requestOtp } from "@/services/otp.service";

export function useRequestOtp() {
  return useMutation({
    mutationFn: requestOtp,
  });
}
