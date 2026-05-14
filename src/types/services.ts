export type ServicePriceUnit = "session";

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
  sortOrder: number;
};
