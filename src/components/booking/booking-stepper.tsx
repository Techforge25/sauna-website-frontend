import { HiCheck } from "react-icons/hi2";

import { cn } from "@/lib/utils/cn";
import type { BookingStep } from "@/store/booking-flow-slice";

type BookingStepperVisualStep = "service" | "date-time" | "confirmation";

type BookingStepperProps = {
  className?: string;
  currentStep: BookingStep | BookingStepperVisualStep;
  title?: string;
};

const stepperSteps: Array<{
  key: BookingStepperVisualStep;
  label: string;
}> = [
  { key: "service", label: "Services" },
  { key: "date-time", label: "Date & Time" },
  { key: "confirmation", label: "Confirmation" },
];

const titleByStep: Record<BookingStepperVisualStep, string> = {
  service: "Select Services",
  "date-time": "Select Date & Time",
  confirmation: "Confirmation",
};

function getVisualStep(step: BookingStepperProps["currentStep"]) {
  if (step === "checkout" || step === "success") {
    return "confirmation";
  }

  return step;
}

export function BookingStepper({
  className,
  currentStep,
  title,
}: BookingStepperProps) {
  const visualStep = getVisualStep(currentStep);
  const activeIndex = stepperSteps.findIndex((step) => step.key === visualStep);
  const progressPercent = (activeIndex / (stepperSteps.length - 1)) * 100;

  return (
    <div className={cn("flex w-full flex-col items-start gap-8", className)}>
      <h1 className="font-serif text-[36px] font-medium leading-[46px] text-foreground">
        {title ?? titleByStep[visualStep]}
      </h1>

      <div className="relative w-full rounded-[16px] border border-border bg-white px-5 py-8 sm:px-[22px]">
        <div
          aria-hidden="true"
          className="absolute left-[16.666%] right-[16.666%] top-[51px] h-0.5 overflow-hidden rounded-pill bg-[#e5e7eb]"
        >
          <div
            className="h-full rounded-pill bg-[linear-gradient(180deg,#FAE20F_31.11%,#F84906_111.11%)] transition-[width] duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <ol
          aria-label="Booking progress"
          className="relative z-10 grid w-full grid-cols-3 gap-4"
        >
          {stepperSteps.map((step, index) => {
            const isActive = index === activeIndex;
            const isCompleted = index < activeIndex;

            return (
              <li
                aria-current={isActive ? "step" : undefined}
                className="flex min-w-0 flex-col items-center gap-2"
                key={step.key}
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full font-serif text-lg font-medium leading-[26px]",
                    isActive &&
                      "border-4 border-[rgba(255,255,255,0.8)] bg-[linear-gradient(180deg,#FAE20F_31.11%,#F84906_111.11%)] text-white",
                    isCompleted &&
                      "border-4 border-[rgba(255,255,255,0.8)] bg-[linear-gradient(180deg,#FAE20F_31.11%,#F84906_111.11%)] text-white",
                    !isActive &&
                      !isCompleted &&
                      "border border-border bg-white text-[#111827]",
                  )}
                >
                  {isCompleted ? (
                    <HiCheck aria-hidden="true" className="size-5" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="w-full text-center font-serif text-base font-medium leading-5 text-[#111827]">
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
