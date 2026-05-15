import Image from "next/image";

import { GradientText, SectionBadge, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import type { Service } from "@/types";

const services: Service[] = [
  {
    id: "shared-session-50",
    title: "50 Mins Shared Session",
    slug: "50-mins-shared-session",
    durationMinutes: 50,
    priceCents: 1600,
    currency: "EUR",
    priceUnit: "session",
    description:
      "Please note: Loyalty points are limited to one per booking, regardless of the number of guests. By proceeding, you agree to our Terms of Service and Privacy Policy. For more details, please review our full terms and conditions via the links at the bottom of this page.",
    imageUrl: "/Images/booking/shared-session.png",
    isActive: true,
    serviceType: "shared",
    sortOrder: 1,
  },
  {
    id: "private-sauna-session-50",
    title: "50 Min Private Sauna Session",
    slug: "50-min-private-sauna-session",
    durationMinutes: 50,
    priceCents: 13900,
    currency: "EUR",
    priceUnit: "session",
    description:
      "By proceeding with this booking you accept our terms of service. Links to terms of service and privacy policy can be accessed at the bottom of the page.",
    imageUrl: "/Images/booking/private-session.png",
    isActive: true,
    serviceType: "private",
    sortOrder: 2,
  },
] as const;

const currencyFormatters: Record<Service["currency"], Intl.NumberFormat> = {
  EUR: new Intl.NumberFormat("en-IE", {
    currency: "EUR",
    minimumFractionDigits: 2,
    style: "currency",
  }),
};

export function ServicesSection() {
  const activeServices = services
    .filter((service) => service.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="bg-surface px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[62px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionBadge>Services</SectionBadge>
          <SectionHeading>
            Regular <GradientText>Sessions</GradientText>
          </SectionHeading>
        </div>

        <div className="grid w-full justify-center gap-8 lg:grid-cols-[repeat(2,481px)]">
          {activeServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  service: Service;
};

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="flex w-full max-w-[481px] flex-col gap-8 overflow-hidden rounded-[16px] border border-border bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-card">
      <div className="relative h-[246px] w-full overflow-hidden rounded-lg bg-primary-light">
        <Image
          fill
          alt={service.title}
          className="object-cover"
          sizes="(min-width: 1024px) 449px, 100vw"
          src={service.imageUrl}
        />
        <ServiceTypeBadge serviceType={service.serviceType} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-[22px] font-medium capitalize leading-9 text-foreground">
              {service.title}
            </h2>
            <DurationBadge minutes={service.durationMinutes} />
          </div>

          <div className="flex items-center gap-1 capitalize">
            <span
              className={cn(
                "text-[28px] font-semibold leading-9",
                service.priceCents >= 10000 ? "text-primary-dark" : "text-primary",
              )}
            >
              {formatServicePrice(service)}
            </span>
            <span
              className={cn(
                "text-base leading-9",
                service.priceCents >= 10000 ? "text-[#826357]" : "text-[#ff7743]",
              )}
            >
              /{service.priceUnit}
            </span>
          </div>
        </div>

        <p className="text-lg leading-6 text-muted">{service.description}</p>
      </div>
    </article>
  );
}

type DurationBadgeProps = {
  minutes: number;
};

function DurationBadge({ minutes }: DurationBadgeProps) {
  return (
    <span className="inline-flex h-7 shrink-0 items-center justify-center rounded-pill border border-primary-light bg-primary/4 px-[11px] text-base font-medium lowercase leading-[22px] tracking-[0.12em] text-primary">
      {minutes}m
    </span>
  );
}

function ServiceTypeBadge({
  serviceType,
}: {
  serviceType: Service["serviceType"];
}) {
  return (
    <span className="absolute right-3 top-3 inline-flex h-[24px] items-center justify-center rounded-pill border border-white px-3 text-xs font-medium capitalize leading-none text-white shadow-[0px_4px_12px_rgba(0,0,0,0.18)]">
      {formatServiceType(serviceType)}
    </span>
  );
}

function formatServiceType(serviceType: Service["serviceType"]) {
  return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
}

function formatServicePrice(service: Service) {
  return currencyFormatters[service.currency].format(service.priceCents / 100);
}
