import { ContactUsSection } from "@/components/common/contact-us-section";
import { PageHero, PageHeroKeywordStrip } from "@/components/common/page-hero";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import { CraftsmanshipSection } from "../home/craftsmanship-section";
import { AboutCtaSection } from "./about-cta-section";
import { ValuesSection } from "./values-section";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          backgroundClassName="bg-[length:100%_100%]"
          className="h-[541px] sm:h-[541px] lg:h-[541px]"
          contentClassName="items-end pb-[48px] lg:items-end lg:px-[120px] lg:pt-0"
          description="The story behind B&M Saunas - where engineering meets ancient wellness rituals. Discover how we redefined the modern recovery experience."
          imageSrc="/Images/aboutus-hero-fit.png"
          // showOverlay={false}
          title={
            <>
              Crafting the Ultimate
              <br />
              Private Retreat.
            </>
          }
        />
        <PageHeroKeywordStrip />
        <CraftsmanshipSection />
        <ValuesSection />
        <AboutCtaSection />
        <ContactUsSection />
      </main>
      <Footer />
    </>
  );
}
