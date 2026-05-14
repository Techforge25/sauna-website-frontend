import { z } from "zod";

export const newBookingSchema = z.object({
  selectedDate: z.string().min(1, "Select a date"),
  selectedServiceId: z.string().min(1, "Select a service"),
  selectedSlotId: z.string().min(1, "Select a time slot"),
});

export type NewBookingInput = z.infer<typeof newBookingSchema>;
