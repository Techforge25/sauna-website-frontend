import { cn } from "@/lib/utils/cn";

type ContainerSize = "sm" | "md" | "lg" | "xl";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize;
};

const sizes: Record<ContainerSize, string> = {
  sm: "max-w-[820px]",
  md: "max-w-[1040px]",
  lg: "max-w-[1200px]",
  xl: "max-w-[1320px]",
};

export function Container({
  className,
  size = "lg",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

type PageSectionProps = React.HTMLAttributes<HTMLElement> & {
  spacing?: "sm" | "md" | "lg";
};

const sectionSpacing = {
  sm: "py-section-sm",
  md: "py-16 md:py-section",
  lg: "py-20 md:py-28",
};

export function PageSection({
  className,
  spacing = "md",
  ...props
}: PageSectionProps) {
  return (
    <section className={cn(sectionSpacing[spacing], className)} {...props} />
  );
}
