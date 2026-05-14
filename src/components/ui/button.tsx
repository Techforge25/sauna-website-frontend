import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "white";

type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = React.ComponentProps<typeof Link> & {
  fullWidth?: boolean;
  hideDefaultIcon?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "[background-image:var(--gradient-button)] text-white shadow-sm hover:[background-image:var(--gradient-button-hover)]",
  secondary: "bg-primary-light text-primary-dark hover:bg-primary-hover",
  outline:
    "border border-[#807e7e] bg-transparent text-[#807e7e] hover:border-primary hover:text-primary",
  ghost: "text-foreground hover:bg-primary-light",
  danger: "bg-danger text-white hover:bg-danger/90",
  white: "bg-white text-[#141110] hover:bg-white/90",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 gap-2 px-4 text-sm",
  md: "h-[47px] gap-2 px-[22px] text-base",
  lg: "h-14 gap-3 px-8 text-base",
  icon: "size-11 p-0",
};

export function Button({
  children,
  className,
  fullWidth = false,
  hideDefaultIcon = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <Link
      aria-disabled={isLoading || undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-pill font-sans font-normal tracking-[-0.02em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        isLoading && "pointer-events-none opacity-60",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        leftIcon
      )}
      {size !== "icon" ? (
        <span className="capitalize">{children}</span>
      ) : (
        children
      )}
      {!isLoading && size !== "icon"
        ? (rightIcon ??
          (variant === "primary" && !hideDefaultIcon ? (
            <span
              aria-hidden="true"
              className="flex h-[23px] w-[18px] items-center justify-center text-[22px] leading-none"
            >
              &rarr;
            </span>
          ) : null))
        : null}
    </Link>
  );
}
