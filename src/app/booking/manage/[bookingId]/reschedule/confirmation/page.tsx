import { RescheduleConfirmationView } from "@/components/booking/reschedule-confirmation-view";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type RescheduleConfirmationPageProps = {
  params: Promise<{
    bookingId: string;
  }>;
  searchParams: Promise<{
    date?: string;
    endTime?: string;
    slotId?: string;
    startTime?: string;
  }>;
};

export default async function RescheduleConfirmationPage({
  params,
  searchParams,
}: RescheduleConfirmationPageProps) {
  const { bookingId } = await params;
  const { date, endTime, slotId, startTime } = await searchParams;

  return (
    <>
      <Navbar />
      <main>
        <RescheduleConfirmationView
          bookingId={bookingId}
          selectedEndTime={endTime}
          selectedDate={date ?? "2026-05-30"}
          selectedSlotId={slotId ?? "10-00"}
          selectedStartTime={startTime}
        />
      </main>
      <Footer />
    </>
  );
}
