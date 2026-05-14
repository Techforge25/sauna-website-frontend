"use client";

import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

import { Input } from "@/components/ui";
import { env } from "@/config/env";
import { routes } from "@/config/routes";
import { useRequestOtp } from "@/hooks";
import {
  type BookingAccessInput,
  bookingAccessSchema,
} from "@/schemas/booking-access";
import { setCustomer } from "@/store/booking-flow-slice";
import { useAppDispatch } from "@/store/hooks";

const fieldClassName =
  "h-12 rounded-xl px-3 py-3 text-sm tracking-[-0.02em] placeholder:text-muted-light";

const formFields = [
  {
    label: "Name*",
    name: "name",
    placeholder: "Enter your Name",
    type: "text",
  },
  {
    label: "Phone Number*",
    name: "phone",
    placeholder: "Enter your Phone Number",
    type: "tel",
  },
  {
    label: "Email*",
    name: "email",
    placeholder: "Enter your Email",
    type: "email",
  },
] as const;

export function BookingStartForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const requestOtp = useRequestOtp();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<BookingAccessInput>({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
    },
  });

  async function onSubmit(values: BookingAccessInput) {
    setFormError(null);

    const parsedValues = bookingAccessSchema.safeParse(values);

    if (!parsedValues.success) {
      for (const issue of parsedValues.error.issues) {
        const fieldName = issue.path[0];

        if (
          fieldName === "email" ||
          fieldName === "name" ||
          fieldName === "phone"
        ) {
          setError(fieldName, { message: issue.message });
        }
      }

      return;
    }

    try {
      if (!env.enableApiMocks) {
        await requestOtp.mutateAsync(parsedValues.data);
      }

      dispatch(setCustomer(parsedValues.data));
      router.push(routes.bookingVerifyOtp);
    } catch (error) {
      const message =
        isAxiosError(error) && typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : "Unable to send OTP. Please try again.";

      setFormError(message);
    }
  }

  return (
    <section className="bg-background px-5 pb-[100px] pt-8 sm:px-8 lg:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-8">
        <button
          className="inline-flex items-center gap-2 text-sm leading-6 text-black transition-colors hover:text-primary"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
              return;
            }

            router.push(routes.services);
          }}
          type="button"
        >
          <HiArrowLeft aria-hidden="true" className="size-5" />
          Back
        </button>

        <form
          className="w-full rounded-[16px] border border-border bg-white p-6 sm:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-serif text-[32px] font-medium leading-[46px] text-foreground">
            Fill Information
          </h1>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {formFields.slice(0, 2).map((field) => (
              <Input
                className={fieldClassName}
                error={errors[field.name]?.message}
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                {...register(field.name)}
              />
            ))}

            <Input
              className={fieldClassName}
              error={errors.email?.message}
              label="Email*"
              placeholder="Enter your Email"
              type="email"
              {...register("email")}
              wrapperClassName="lg:col-span-2"
            />
          </div>

          {formError ? (
            <p className="mt-5 text-sm leading-5 text-danger">{formError}</p>
          ) : null}

          <button
            className="mt-8 inline-flex h-[47px] items-center justify-center gap-1 rounded-pill px-[22px] py-2.5 text-base font-normal leading-[23px] tracking-[-0.02em] text-white transition-opacity [background-image:var(--gradient-button)] hover:[background-image:var(--gradient-button-hover)] disabled:pointer-events-none disabled:opacity-60"
            disabled={!env.enableApiMocks && requestOtp.isPending}
            type="submit"
          >
            {!env.enableApiMocks && requestOtp.isPending
              ? "Sending..."
              : "Send OTP"}
            <HiArrowRight aria-hidden="true" className="size-[18px]" />
          </button>
        </form>
      </div>
    </section>
  );
}
