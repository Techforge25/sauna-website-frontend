import { useMutation } from "@tanstack/react-query";

import { createPaymentSession } from "@/services/payments.service";

export function useCreatePaymentSession() {
  return useMutation({
    mutationFn: createPaymentSession,
  });
}
