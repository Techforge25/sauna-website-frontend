import { cn } from "@/lib/utils/cn";

type HeadingTag = "h1" | "h2" | "h3" | "h4";
type TextTag = "p" | "span" | "div";
type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4";
type TextSize = "lg" | "md" | "sm" | "xs";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingTag;
  size?: HeadingSize;
};

type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: TextTag;
  size?: TextSize;
  tone?: "default" | "muted" | "primary" | "danger";
};

const headingSizes: Record<HeadingSize, string> = {
  display: "text-5xl leading-[1.08] md:text-7xl",
  h1: "text-4xl leading-tight md:text-[52px] md:leading-[1.2]",
  h2: "text-3xl leading-tight md:text-4xl",
  h3: "text-2xl leading-snug",
  h4: "text-xl leading-snug",
};

const textSizes: Record<TextSize, string> = {
  lg: "text-lg leading-7",
  md: "text-base leading-6",
  sm: "text-sm leading-5",
  xs: "text-xs leading-4",
};

const tones = {
  default: "text-foreground",
  muted: "text-muted",
  primary: "text-primary",
  danger: "text-danger",
};

export function Heading({
  as,
  className,
  size = "h1",
  ...props
}: HeadingProps) {
  const Component = as ?? "h1";

  return (
    <Component
      className={cn(
        "font-serif font-medium tracking-normal text-foreground",
        headingSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function Text({ as, className, ...props }: TextProps) {
  const Component = as ?? "p";
  const { size = "md", tone = "muted", ...rest } = props;

  return (
    <Component
      className={cn(
        "font-sans font-normal",
        textSizes[size],
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}

export function Eyebrow({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm font-normal uppercase leading-5 tracking-[0.12em] text-primary",
        className,
      )}
      {...props}
    />
  );
}
