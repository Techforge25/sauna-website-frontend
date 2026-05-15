import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import { TermsAndConditionsContent } from "./terms-and-conditions-content";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for B&M Saunas bookings, session rules, health and safety, cancellations, refunds, and property conduct.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <TermsAndConditionsContent />
      </main>
      <Footer />
    </>
  );
}
