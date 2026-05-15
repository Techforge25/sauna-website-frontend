import { z } from "zod";

export const bookingAccessSchema = z.object({
  email: z.string().email("Email address is required"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(8, "Phone number is required"),
});

export type BookingAccessInput = z.infer<typeof bookingAccessSchema>;
