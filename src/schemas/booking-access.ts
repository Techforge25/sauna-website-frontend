import { z } from "zod";

export const bookingAccessSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(8, "Enter a valid phone number"),
});

export type BookingAccessInput = z.infer<typeof bookingAccessSchema>;
