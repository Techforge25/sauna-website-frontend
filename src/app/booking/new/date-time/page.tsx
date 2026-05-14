import { DateTimeSelectionView } from "@/components/booking/date-time-selection-view";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function NewBookingDateTimePage() {
  return (
    <>
      <Navbar />
      <main>
        <DateTimeSelectionView />
      </main>
      <Footer />
    </>
  );
}
