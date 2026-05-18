"use client";

import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type UseFormRegisterReturn, useWatch } from "react-hook-form";
import { HiArrowLeft, HiArrowRight, HiChevronDown } from "react-icons/hi2";

import { Input } from "@/components/ui";
import { env } from "@/config/env";
import { routes } from "@/config/routes";
import { useCancelBooking } from "@/hooks";
import { cn } from "@/lib/utils/cn";
import {
  type CancellationInput,
  cancellationSchema,
} from "@/schemas/cancellation";

const fieldClassName =
  "h-[46px] rounded-[12px] border-[#666464] px-[13px] py-[14px] text-base tracking-[-0.02em] placeholder:text-muted-light";

const cancellationReasons = [
  "Schedule conflict",
  "Changed my mind",
  "Booked by mistake",
  "Payment issue",
  "Other",
];

type CancelBookingRequestViewProps = {
  bookingId: string;
};

export function CancelBookingRequestView({
  bookingId,
}: CancelBookingRequestViewProps) {
  const router = useRouter();
  const cancelBooking = useCancelBooking();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<CancellationInput>({
    defaultValues: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      notes: "",
      reason: "",
    },
  });
  const selectedReason = useWatch({ control, name: "reason" }) ?? "";

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(routes.bookingMyBookings);
  }

  async function onSubmit(values: CancellationInput) {
    setFormError(null);
    const parsedValues = cancellationSchema.safeParse(values);

    if (!parsedValues.success) {
      for (const issue of parsedValues.error.issues) {
        const fieldName = issue.path[0];

        if (
          fieldName === "accountHolderName" ||
          fieldName === "accountNumber" ||
          fieldName === "bankName" ||
          fieldName === "notes" ||
          fieldName === "reason"
        ) {
          setError(fieldName, { message: issue.message });
        }
      }

      return;
    }

    try {
      if (!env.enableApiMocks) {
        await cancelBooking.mutateAsync({
          bookingId,
          payload: parsedValues.data,
        });
      }

      router.replace(routes.bookingCancelSubmitted(bookingId));
    } catch (error) {
      const message =
        isAxiosError(error) && typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : "Unable to submit cancellation request. Please try again.";

      setFormError(message);
    }
  }

  return (
    <section className="bg-background px-5 pb-[100px] pt-8 sm:px-8 lg:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[62px]">
        <button
          className="inline-flex items-center gap-2 text-sm leading-6 text-black transition-colors hover:text-primary"
          onClick={handleBack}
          type="button"
        >
          <HiArrowLeft aria-hidden="true" className="size-5" />
          Back
        </button>

        <div className="flex w-full flex-col gap-8">
          <h1 className="font-serif text-[32px] font-medium leading-tight text-foreground sm:text-[36px] sm:leading-[62px]">
            Cancellation &amp; Refund Request
          </h1>

          <form
            className="flex w-full flex-col gap-8 rounded-[16px] border border-border bg-white p-6 sm:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ReasonSelect
              error={errors.reason?.message}
              register={register("reason")}
              selectedReason={selectedReason}
              setReason={(reason) =>
                setValue("reason", reason, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            />

            <TextareaField
              error={errors.notes?.message}
              label="Additional Notes (Optional)"
              placeholder="let us know if there's anything else..."
              {...register("notes")}
            />

            <div className="flex w-full flex-col gap-8">
              <h2 className="font-serif text-2xl font-semibold capitalize leading-7 text-foreground">
                Bank Transfer
              </h2>

              <div className="flex w-full flex-col gap-[22px] rounded-[16px] border border-border bg-white p-4">
                <h3 className="font-serif text-lg font-semibold capitalize leading-[22px] text-foreground">
                  Bank Details
                </h3>

                <div className="flex w-full flex-col gap-6">
                  <Input
                    className={fieldClassName}
                    error={errors.accountHolderName?.message}
                    label="Account Holder Name*"
                    {...register("accountHolderName")}
                  />

                  <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
                    <Input
                      className={fieldClassName}
                      error={errors.bankName?.message}
                      label="Bank Name*"
                      {...register("bankName")}
                    />
                    <Input
                      className={fieldClassName}
                      error={errors.accountNumber?.message}
                      label="IBAN / Account No.*"
                      {...register("accountNumber")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[8px] border border-[#fee4da] bg-primary-light p-[17px]">
              <div className="flex flex-col gap-1">
                <p className="text-base font-bold leading-6 text-primary">
                  Cancellation Policy
                </p>
                <p className="text-sm leading-[18px] tracking-[0.05em] text-primary/80">
                  Refunds are subject to a 5% processing fee. Cancellations made
                  less than 24h before the slot are non-refundable.
                </p>
              </div>
            </div>

            {formError ? (
              <p className="text-sm leading-5 text-danger">{formError}</p>
            ) : null}

            <button
              className="inline-flex h-[47px] w-full items-center justify-center gap-1 rounded-pill px-[22px] py-2.5 text-base font-normal leading-[22px] tracking-[-0.02em] text-white transition-opacity [background-image:var(--gradient-button)] hover:[background-image:var(--gradient-button-hover)] disabled:pointer-events-none disabled:opacity-60"
              disabled={!env.enableApiMocks && cancelBooking.isPending}
              type="submit"
            >
              {!env.enableApiMocks && cancelBooking.isPending
                ? "Submitting..."
                : "submit"}
              <HiArrowRight aria-hidden="true" className="size-[18px]" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ReasonSelect({
  error,
  register,
  selectedReason,
  setReason,
}: {
  error?: string;
  register: UseFormRegisterReturn<"reason">;
  selectedReason: string;
  setReason: (reason: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full space-y-2">
      <label
        className="block text-sm font-medium leading-[1.6] tracking-[-0.02em] text-foreground"
        htmlFor="reason"
      >
        Reason for Cancellation *
      </label>
      <div className="relative">
        <input type="hidden" {...register} />
        <button
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={cn(
            "flex h-[46px] w-full items-center justify-between rounded-[12px] border border-[#666464] bg-white px-[13px] py-[11px] text-left text-base tracking-[-0.02em] outline-none transition-colors focus:border-primary focus-visible:border-primary focus-visible:outline-none",
            selectedReason ? "text-foreground" : "text-muted",
            error && "border-danger focus:border-danger",
          )}
          id="reason"
          onBlur={() => {
            window.setTimeout(() => setIsOpen(false), 120);
          }}
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span>{selectedReason || "Select a reason"}</span>
          <HiChevronDown
            aria-hidden="true"
            className={cn(
              "size-5 text-muted transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {isOpen ? (
          <div
            className="absolute left-0 right-0 top-[54px] z-20 overflow-hidden rounded-[12px] border border-border bg-white p-1 shadow-[0px_16px_40px_rgba(0,0,0,0.12)]"
            role="listbox"
          >
            {cancellationReasons.map((reason) => {
              const isSelected = selectedReason === reason;

              return (
                <button
                  aria-selected={isSelected}
                  className={cn(
                    "flex h-11 w-full items-center rounded-[10px] px-3 text-left text-base tracking-[-0.02em] transition-colors",
                    isSelected
                      ? "bg-primary-light text-primary"
                      : "text-foreground hover:bg-primary-light",
                  )}
                  key={reason}
                  onClick={() => {
                    setReason(reason);
                    setIsOpen(false);
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                  role="option"
                  type="button"
                >
                  {reason}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
      {error ? <p className="text-sm leading-5 text-danger">{error}</p> : null}
    </div>
  );
}

type TextareaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
  label: string;
};

function TextareaField({
  className,
  error,
  id = "notes",
  label,
  ...props
}: TextareaFieldProps) {
  return (
    <div className="w-full space-y-2">
      <label
        className="block text-sm font-medium leading-[1.6] tracking-[-0.02em] text-foreground"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        aria-invalid={error ? true : undefined}
        className={cn(
          "h-[117px] w-full resize-none rounded-[12px] border border-border bg-white px-[13px] py-[14px] text-base text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-primary focus-visible:border-primary focus-visible:outline-none",
          error && "border-danger focus:border-danger",
          className,
        )}
        id={id}
        {...props}
      />
      {error ? <p className="text-sm leading-5 text-danger">{error}</p> : null}
    </div>
  );
}
