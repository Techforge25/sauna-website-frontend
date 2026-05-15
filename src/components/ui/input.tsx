import { forwardRef, useId } from "react";

import { cn } from "@/lib/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  hint?: string;
  label?: string;
  labelClassName?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  wrapperClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      hint,
      id,
      label,
      labelClassName,
      leftIcon,
      rightElement,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? props.name ?? generatedId;
    const descriptionId = error
      ? `${inputId}-error`
      : hint
        ? `${inputId}-hint`
        : undefined;

    return (
      <div className={cn("w-full space-y-2", wrapperClassName)}>
        {label ? (
          <label
            className={cn(
              "block text-sm font-medium leading-5 text-foreground",
              labelClassName,
            )}
            htmlFor={inputId}
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          {leftIcon ? (
            <span className="pointer-events-none absolute left-4 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-muted">
              {leftIcon}
            </span>
          ) : null}
          <input
            aria-describedby={descriptionId}
            aria-invalid={error ? true : undefined}
            className={cn(
              "h-[52px] w-full rounded-md border border-border bg-surface px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-70",
              leftIcon && "pl-12",
              rightElement && "pr-12",
              error && "border-danger focus:border-danger",
              className,
            )}
            id={inputId}
            ref={ref}
            {...props}
          />
          {rightElement ? (
            <span className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-muted">
              {rightElement}
            </span>
          ) : null}
        </div>
        {error ? (
          <p className="text-sm leading-5 text-danger" id={`${inputId}-error`}>
            {error}
          </p>
        ) : hint ? (
          <p className="text-sm leading-5 text-muted" id={`${inputId}-hint`}>
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
