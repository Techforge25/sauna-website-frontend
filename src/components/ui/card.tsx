import { cn } from "@/lib/utils/cn";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

type CardVariant = "default" | "elevated" | "accent" | "muted";
type CardPadding = "none" | "sm" | "md" | "lg";

type CardProps = DivProps & {
  padding?: CardPadding;
  variant?: CardVariant;
};

const variants: Record<CardVariant, string> = {
  default: "border-border bg-surface",
  elevated: "border-transparent bg-surface shadow-card",
  accent: "border-primary bg-surface shadow-card",
  muted: "border-border bg-surface-muted",
};

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  className,
  padding = "none",
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border",
        variants[variant],
        paddings[padding],
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn("p-6 pb-0", className)} {...props} />;
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "font-serif text-3xl font-medium text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-base leading-6 text-muted", className)} {...props} />
  );
}
