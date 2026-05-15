import type { Service, TimeSlot } from "@/types";

export const bookingTermsCopy =
  "By proceeding with this booking you accept our terms of service. Links to terms of service and privacy policy can be accessed at the bottom of the page.";

export const mockServices: Service[] = [
  {
    currency: "EUR",
    description: bookingTermsCopy,
    durationMinutes: 50,
    id: "shared-50",
    imageUrl: "",
    isActive: true,
    priceCents: 1600,
    priceUnit: "session",
    serviceType: "shared",
    slug: "50-mins-shared-session",
    sortOrder: 1,
    title: "50 Mins Shared Session",
  },
  {
    currency: "EUR",
    description: bookingTermsCopy,
    durationMinutes: 50,
    id: "private-50",
    imageUrl: "",
    isActive: true,
    priceCents: 13900,
    priceUnit: "session",
    serviceType: "private",
    slug: "50-min-private-sauna-session",
    sortOrder: 2,
    title: "50 Min Private Sauna Session",
  },
];

export const mockTimeSlots: TimeSlot[] = [
  { endTime: "08:50", id: "08-00", isAvailable: true, startTime: "08:00" },
  { endTime: "09:50", id: "09-00", isAvailable: true, startTime: "09:00" },
  { endTime: "10:50", id: "10-00", isAvailable: true, startTime: "10:00" },
  { endTime: "12:50", id: "12-00", isAvailable: true, startTime: "12:00" },
  { endTime: "13:50", id: "13-00", isAvailable: true, startTime: "13:00" },
  { endTime: "14:50", id: "14-00", isAvailable: false, startTime: "14:00" },
  { endTime: "15:50", id: "15-00", isAvailable: false, startTime: "15:00" },
  { endTime: "16:50", id: "16-00", isAvailable: true, startTime: "16:00" },
  { endTime: "17:50", id: "17-00", isAvailable: true, startTime: "17:00" },
];

export function formatCurrency(priceCents: number) {
  return new Intl.NumberFormat("en-IE", {
    currency: "EUR",
    minimumFractionDigits: 2,
    style: "currency",
  }).format(priceCents / 100);
}

export function formatDisplayDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
