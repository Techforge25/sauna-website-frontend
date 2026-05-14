import { z } from "zod";

export const checkoutSchema = z.object({
  paymentProvider: z.enum(["stripe", "paypal", "revolut"]),
  peopleCount: z.number().int().min(1, "At least one person is required"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
