import { z } from "zod";

export const cancellationSchema = z.object({
  accountHolderName: z.string().min(1, "Account Holder Name is required"),
  accountNumber: z.string().min(1, "Account or IBAN is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  notes: z.string().optional(),
  reason: z.string().min(1, "Cancellation reason is required"),
});

export type CancellationInput = z.infer<typeof cancellationSchema>;
