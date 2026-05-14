import { ServiceSelectionView } from "@/components/booking/service-selection-view";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function NewBookingServicePage() {
  return (
    <>
      <Navbar />
      <main>
        <ServiceSelectionView />
      </main>
      <Footer />
    </>
  );
}
