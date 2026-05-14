"use client";

import { useRouter } from "next/navigation";
import { HiArrowDownTray, HiArrowLeft } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

const bookingSummary = [
  ["Service:", "50 mins shared session"],
  ["Date:", "Saturday, May 26, 2026"],
  ["Time Slot:", "14:00 - 16:00"],
  ["Access Code:", "BMA-749-291"],
  ["Payment Method:", "PayPal"],
];

const cancellationInfo = [
  ["Requested On:", "6 May 2026 at 10:11"],
  ["Reason:", "Personal reasons"],
];

const refundDestination = [
  ["Method:", "Bank Transfer"],
  ["Account Holder:", "John Smith"],
  ["Bank:", "Global Bank Ltd."],
  ["Account/IBAN:", "784512369874"],
];

type CancellationSubmittedViewProps = {
  bookingId: string;
};

export function CancellationSubmittedView({
  bookingId,
}: CancellationSubmittedViewProps) {
  const router = useRouter();
  void bookingId;

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(routes.bookingMyBookings);
  }

  function handleDownloadReceipt() {
    // Backend will provide the generated PDF URL in the final integration.
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
            Cancellation Request Submitted
          </h1>

          <div className="flex w-full flex-col gap-8 rounded-[16px] border-t-[5px] border-primary bg-white p-6 sm:p-8">
            <div className="flex w-full flex-col gap-6">
              <div className="flex w-full items-start gap-8">
                <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
                  <p className="text-sm leading-[18px] tracking-[-0.02em] text-muted">
                    Receipt No.
                  </p>
                  <p className="text-lg font-semibold leading-[22px] text-foreground">
                    REC-344693
                  </p>
                </div>
                <span className="rounded-[6px] bg-[#fee4da] px-2 py-[3px] text-xs font-medium leading-4 text-primary">
                  Pending Refund
                </span>
              </div>
              <Divider />
            </div>

            <ReceiptSection title="Booking Summary">
              <SummaryRows rows={bookingSummary} />
            </ReceiptSection>

            <ReceiptSection title="Cancellation Info">
              <SummaryRows rows={cancellationInfo} />
              <div className="flex flex-col gap-1.5">
                <p className="text-base leading-5 text-muted">
                  Additional Note:
                </p>
                <p className="text-base leading-5 text-foreground">
                  Due to personal reasons, I am unable to attend the scheduled
                  session. Kindly proceed with the cancellation and refund.
                </p>
              </div>
            </ReceiptSection>

            <div className="flex w-full flex-col gap-[22px] rounded-[16px] border border-border bg-white p-4">
              <h2 className="font-serif text-lg font-semibold capitalize leading-[22px] text-foreground">
                Refund Destination
              </h2>
              <SummaryRows rows={refundDestination} />
            </div>

            <div className="rounded-[8px] border border-[#fee4da] bg-primary-light p-[17px]">
              <p className="text-sm leading-[18px] tracking-[0.05em] text-primary/80">
                * Refunds are typically processed within 3-5 business days for
                cards, or up to 7 days for bank transfers.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
              <button
                className="inline-flex h-[47px] w-full items-center justify-center gap-1 rounded-pill px-[22px] py-2.5 text-base font-normal leading-[22px] tracking-[-0.02em] text-white transition-opacity [background-image:var(--gradient-button)] hover:[background-image:var(--gradient-button-hover)]"
                onClick={handleDownloadReceipt}
                type="button"
              >
                <HiArrowDownTray aria-hidden="true" className="size-[18px]" />
                Download PDF Receipt
              </button>
              <Button
                fullWidth
                hideDefaultIcon
                href={routes.bookingMyBookings}
                variant="outline"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReceiptSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="flex w-full flex-col gap-6">
      <h2 className="text-2xl font-semibold leading-[22px] text-foreground">
        {title}
      </h2>
      <div className="flex w-full flex-col gap-4">{children}</div>
      <Divider />
    </section>
  );
}

function SummaryRows({ rows }: { rows: string[][] }) {
  return (
    <div className="flex w-full flex-col gap-4">
      {rows.map(([label, value]) => (
        <div
          className="flex w-full flex-col gap-1 text-base leading-5 sm:flex-row sm:items-center sm:gap-[49px]"
          key={label}
        >
          <span className="min-w-0 flex-1 capitalize text-muted">{label}</span>
          <span className="text-foreground sm:text-right">{value}</span>
        </div>
      ))}
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full border-t border-dashed border-border" />;
}
