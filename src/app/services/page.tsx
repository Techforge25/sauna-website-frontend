import { ContactUsSection } from "@/components/common/contact-us-section";
import { PageHero, PageHeroKeywordStrip } from "@/components/common/page-hero";
import { ReadyRetreatSection } from "@/components/common/ready-retreat-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import { ServicesSection } from "./services-section";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          backgroundClassName="bg-[length:100%_100%]"
          className="h-[541px] sm:h-[541px] lg:h-[541px]"
          contentClassName="items-end pb-[60px] lg:items-end lg:px-[120px] lg:pt-0"
          description="Experience the science of heat in its most refined form."
          imageSrc="/Images/booking-hero.png"
          title={
            <>
              Precision Wellness
              <br />
              Engineering.
            </>
          }
        />
        <PageHeroKeywordStrip />
        <ServicesSection />
        <ReadyRetreatSection />
        <ContactUsSection />
      </main>
      <Footer />
    </>
  );
}
