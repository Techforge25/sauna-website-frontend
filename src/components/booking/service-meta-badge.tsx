import type { Service } from "@/types";

type ServiceMetaBadgeProps = {
  children: React.ReactNode;
};

export function ServiceMetaBadge({ children }: ServiceMetaBadgeProps) {
  return (
    <span className="flex h-7 shrink-0 items-center justify-center rounded-pill border border-[#feede6] bg-[rgba(248,73,6,0.04)] px-[11px] text-xs font-semibold leading-[12px] tracking-[0.12em] text-primary">
      {children}
    </span>
  );
}

export function formatServiceType(serviceType: Service["serviceType"]) {
  return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
}
