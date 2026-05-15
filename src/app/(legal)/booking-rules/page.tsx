import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import { BookingRulesContent } from "./booking-rules-content";

export const metadata: Metadata = {
  title: "Booking Rules",
  description:
    "Booking rules and guest guidelines for B&M Saunas sessions, access codes, occupancy, and cleaning protocol.",
};

export default function BookingRulesPage() {
  return (
    <>
      <Navbar />
      <main>
        <BookingRulesContent />
      </main>
      <Footer />
    </>
  );
}
