import { CheckoutView } from "@/components/booking/checkout-view";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function NewBookingCheckoutPage() {
  return (
    <>
      <Navbar />
      <main>
        <CheckoutView />
      </main>
      <Footer />
    </>
  );
}
