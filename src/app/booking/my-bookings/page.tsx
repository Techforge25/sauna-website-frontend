import { MyBookingsView } from "@/components/booking/my-bookings-view";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function MyBookingsPage() {
  return (
    <>
      <Navbar />
      <main>
        <MyBookingsView />
      </main>
      <Footer />
    </>
  );
}
