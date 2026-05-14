import { VerifyOtpForm } from "@/components/booking/verify-otp-form";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function VerifyOtpPage() {
  return (
    <>
      <Navbar />
      <main>
        <VerifyOtpForm />
      </main>
      <Footer />
    </>
  );
}
