"use client";

import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  type ClipboardEvent,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HiArrowLeft, HiArrowRight, HiShieldCheck } from "react-icons/hi2";

import { env } from "@/config/env";
import { routes } from "@/config/routes";
import { useRequestOtp, useVerifyOtp } from "@/hooks";
import { cn } from "@/lib/utils/cn";
import { otpSchema } from "@/schemas/otp";
import { useAppSelector } from "@/store/hooks";

const otpLength = 6;
const initialResendSeconds = 54;

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function getApiErrorMessage(error: unknown, fallback: string) {
  return isAxiosError(error) && typeof error.response?.data?.message === "string"
    ? error.response.data.message
    : fallback;
}

export function VerifyOtpForm() {
  const router = useRouter();
  const customer = useAppSelector((state) => state.bookingFlow.customer);
  const verifyOtp = useVerifyOtp();
  const requestOtp = useRequestOtp();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState<string[]>(
    Array.from({ length: otpLength }, () => ""),
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(
    initialResendSeconds,
  );

  const code = useMemo(() => digits.join(""), [digits]);
  const isComplete = code.length === otpLength;
  const isSubmitting = !env.enableApiMocks && verifyOtp.isPending;
  const isResending = !env.enableApiMocks && requestOtp.isPending;
  const canResendCode = secondsRemaining <= 0 && !isResending;

  useEffect(() => {
    if (!customer) {
      router.replace(routes.bookingStart);
    }
  }, [customer, router]);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setSecondsRemaining((currentSeconds) =>
        Math.max(0, currentSeconds - 1),
      );
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [secondsRemaining]);

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(routes.bookingStart);
  }

  function updateDigit(index: number, value: string) {
    const nextDigit = value.replace(/\D/g, "").slice(-1);

    setDigits((currentDigits) => {
      const nextDigits = [...currentDigits];
      nextDigits[index] = nextDigit;
      return nextDigits;
    });

    setFormError(null);

    if (nextDigit && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (event.key !== "Backspace") {
      return;
    }

    if (digits[index]) {
      return;
    }

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otpLength);

    if (!pastedDigits) {
      return;
    }

    event.preventDefault();

    setDigits(
      Array.from({ length: otpLength }, (_, index) => pastedDigits[index] ?? ""),
    );
    setFormError(null);
    inputRefs.current[Math.min(pastedDigits.length, otpLength) - 1]?.focus();
  }

  async function handleSubmit() {
    setFormError(null);

    const parsedOtp = otpSchema.safeParse({ code });

    if (!parsedOtp.success) {
      setFormError(parsedOtp.error.issues[0]?.message ?? "Enter valid OTP.");
      inputRefs.current[0]?.focus();
      return;
    }

    try {
      if (env.enableApiMocks && parsedOtp.data.code !== env.mockOtpCode) {
        setFormError("Invalid OTP code. Please try again.");
        inputRefs.current[0]?.focus();
        return;
      }

      if (!env.enableApiMocks) {
        await verifyOtp.mutateAsync(parsedOtp.data);
      }

      router.push(routes.bookingMyBookings);
    } catch (error) {
      setFormError(
        getApiErrorMessage(error, "Unable to verify OTP. Please try again."),
      );
    }
  }

  async function handleResendCode() {
    if (!customer || !canResendCode) {
      return;
    }

    setFormError(null);

    try {
      if (!env.enableApiMocks) {
        await requestOtp.mutateAsync(customer);
      }

      setSecondsRemaining(initialResendSeconds);
    } catch (error) {
      setFormError(
        getApiErrorMessage(error, "Unable to resend OTP. Please try again."),
      );
    }
  }

  if (!customer) {
    return null;
  }

  return (
    <section className="bg-background px-5 pb-[38px] pt-8 sm:px-8 lg:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-8">
        <button
          className="inline-flex items-center gap-2 text-sm leading-6 text-black transition-colors hover:text-primary"
          onClick={handleBack}
          type="button"
        >
          <HiArrowLeft aria-hidden="true" className="size-5" />
          Back
        </button>

        <div className="flex w-full flex-col items-center py-[62px]">
          <div className="flex w-full max-w-[460px] flex-col items-center gap-8">
            <div className="flex w-full flex-col items-center gap-[22px]">
              <div className="flex size-20 items-center justify-center rounded-full bg-primary-light text-primary-dark">
                <HiShieldCheck aria-hidden="true" className="size-7" />
              </div>

              <div className="flex w-full flex-col items-center gap-4 text-center">
                <h1 className="font-serif text-[36px] font-medium leading-[46px] text-foreground">
                  Verify Your Identity
                </h1>
                <p className="max-w-[324px] text-lg font-normal leading-6 text-muted">
                  We&apos;ve sent a 6-digit code to your email and phone.
                </p>
              </div>
            </div>

            <div className="flex w-full justify-center gap-2.5 sm:gap-5">
              {digits.map((digit, index) => (
                <input
                  aria-label={`OTP digit ${index + 1}`}
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  className={cn(
                    "h-16 w-[46px] rounded-lg border bg-white text-center text-[32px] font-semibold leading-none tracking-[-0.01125em] text-[#251913] outline-none transition-colors sm:w-[60px]",
                    digit
                      ? "border-[#fae20f]"
                      : "border-border focus:border-[#fae20f]",
                  )}
                  inputMode="numeric"
                  key={index}
                  maxLength={1}
                  onChange={(event) => updateDigit(index, event.target.value)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  onPaste={handlePaste}
                  pattern="[0-9]*"
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  value={digit}
                />
              ))}
            </div>

            {formError ? (
              <p className="w-full text-center text-sm leading-5 text-danger">
                {formError}
              </p>
            ) : null}

            <button
              className={cn(
                "inline-flex h-[47px] w-full items-center justify-center gap-1 rounded-pill px-[22px] py-2.5 text-base font-normal leading-[23px] tracking-[-0.02em] transition-opacity disabled:pointer-events-none",
                isComplete
                  ? "[background-image:var(--gradient-button)] text-white hover:[background-image:var(--gradient-button-hover)]"
                  : "bg-[#dddddd] text-[#807e7e]",
                isSubmitting && "opacity-60",
              )}
              disabled={!isComplete || isSubmitting}
              onClick={handleSubmit}
              type="button"
            >
              {isSubmitting ? "Verifying..." : isComplete ? "Verify OTP" : "Verify"}
              <HiArrowRight aria-hidden="true" className="size-[18px]" />
            </button>
          </div>

          <div className="flex w-full flex-col items-center gap-2 pt-12 text-center text-base leading-6">
            <p className="text-primary-dark">Didn&apos;t receive the code?</p>
            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
              <button
                className={cn(
                  "decoration-solid underline-offset-2 transition-colors",
                  canResendCode
                    ? "text-primary underline hover:text-primary-dark"
                    : "cursor-not-allowed text-muted no-underline",
                )}
                disabled={!canResendCode}
                onClick={handleResendCode}
                type="button"
              >
                {isResending ? "Resending..." : "Resend Code"}
              </button>
              <span className="text-foreground">
                {formatTimer(secondsRemaining)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
