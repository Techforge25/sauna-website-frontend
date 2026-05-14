import { CancelBookingRequestView } from "@/components/booking/cancel-booking-request-view";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type CancelBookingPageProps = {
  params: Promise<{
    bookingId: string;
  }>;
};

export default async function CancelBookingPage({
  params,
}: CancelBookingPageProps) {
  const { bookingId } = await params;

  return (
    <>
      <Navbar />
      <main>
        <CancelBookingRequestView bookingId={bookingId} />
      </main>
      <Footer />
    </>
  );
}
