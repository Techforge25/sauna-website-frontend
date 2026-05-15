import { ContactUsSection } from "@/components/common/contact-us-section";
import { PageHero, PageHeroKeywordStrip } from "@/components/common/page-hero";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import { FaqSection } from "../home/faq-section";
import { ContactInfoSection } from "./contact-info-section";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          backgroundClassName="bg-[length:100%_100%]"
          className="h-[541px] sm:h-[541px] lg:h-[541px]"
          contentClassName="items-end pb-[60px] lg:items-end lg:px-[120px] lg:pt-0"
          description="Have questions about our private retreats or custom builds? Our team is here to help you find your peace."
          imageSrc="/Images/contactUs-hero.png"
          showOverlay={false}

          title={
            <>
              Get in Touch
            </>
          }
        />
        <PageHeroKeywordStrip />
        <ContactInfoSection />
        <ContactUsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
