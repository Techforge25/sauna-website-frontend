import { forwardRef, useId } from "react";

import { cn } from "@/lib/utils/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
  hint?: string;
  label?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, hint, id, label, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? props.name ?? generatedId;
    const descriptionId = error
      ? `${textareaId}-error`
      : hint
        ? `${textareaId}-hint`
        : undefined;

    return (
      <div className="w-full space-y-2">
        {label ? (
          <label
            className="block text-sm font-medium leading-5 text-foreground"
            htmlFor={textareaId}
          >
            {label}
          </label>
        ) : null}
        <textarea
          aria-describedby={descriptionId}
          aria-invalid={error ? true : undefined}
          className={cn(
            "min-h-[117px] w-full resize-none rounded-md border border-border bg-surface px-4 py-3.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-70",
            error && "border-danger focus:border-danger",
            className,
          )}
          id={textareaId}
          ref={ref}
          {...props}
        />
        {error ? (
          <p className="text-sm leading-5 text-danger" id={`${textareaId}-error`}>
            {error}
          </p>
        ) : hint ? (
          <p className="text-sm leading-5 text-muted" id={`${textareaId}-hint`}>
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
