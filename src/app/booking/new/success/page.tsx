import { BookingSuccessView } from "@/components/booking/booking-success-view";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function NewBookingSuccessPage() {
  return (
    <>
      <Navbar />
      <main>
        <BookingSuccessView />
      </main>
      <Footer />
    </>
  );
}
