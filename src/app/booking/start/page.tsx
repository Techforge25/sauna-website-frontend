import { BookingStartForm } from "@/components/booking/booking-start-form";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function BookingStartPage() {
  return (
    <>
      <Navbar />
      <BookingStartForm />
      <Footer />
    </>
  );
}
