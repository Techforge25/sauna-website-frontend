export type ServicePriceUnit = "session";
export type ServiceType = "private" | "shared";

export type Service = {
  id: string;
  title: string;
  slug: string;
  durationMinutes: number;
  priceCents: number;
  currency: "EUR";
  priceUnit: ServicePriceUnit;
  description: string;
  imageUrl: string;
  isActive: boolean;
  serviceType: ServiceType;
  sortOrder: number;
};
