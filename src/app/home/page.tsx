import { ContactUsSection } from "@/components/common/contact-us-section";
import { PageHero, PageHeroKeywordStrip } from "@/components/common/page-hero";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { routes } from "@/config/routes";

import { CraftsmanshipSection } from "./craftsmanship-section";
import { FaqSection } from "./faq-section";
import { GallerySection } from "./gallery-section";
import { HowItWorksSection } from "./how-it-works-section";
import { TestimonialsSection } from "./testimonials-section";
import { WhySaunasSection } from "./why-saunas-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          contentClassName="items-end pb-[60px] lg:items-end lg:pt-0"
          action={{
            href: routes.bookingStart,
            label: "Book Now",
          }}
          description="Experience 50 minutes of pure detox and relaxation. No sign-ups, no accounts just instant peace."
          imageSrc="/Images/home/hero-sauna.png"
          title={
            <>
              Step into Serenity.
              <br />
              Your Private Sauna Escape.
            </>
          }
        />
        <PageHeroKeywordStrip />
        <CraftsmanshipSection />
        <WhySaunasSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FaqSection />
        <GallerySection />
        <ContactUsSection />
      </main>
      <Footer />
    </>
  );
}
