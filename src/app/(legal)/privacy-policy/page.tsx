import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import { PrivacyPolicyContent } from "./privacy-policy-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for B&M Saunas, including personal data handling, booking details, payment partners, and privacy rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PrivacyPolicyContent />
      </main>
      <Footer />
    </>
  );
}
