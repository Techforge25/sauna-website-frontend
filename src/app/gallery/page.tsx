import { ContactUsSection } from "@/components/common/contact-us-section";
import { PageHero, PageHeroKeywordStrip } from "@/components/common/page-hero";
import { ReadyRetreatSection } from "@/components/common/ready-retreat-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import { GallerySection } from "../home/gallery-section";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          backgroundClassName="bg-[length:100%_100%]"
          className="h-[541px] sm:h-[541px] lg:h-[541px]"
          contentClassName="items-end pb-[60px] lg:items-end lg:px-[120px] lg:pt-0"
          description="A glimpse into the sanctuary of precision and peace."
          imageSrc="/Images/gallery-hero.png"
          showOverlay={false}
          title={
            <>
              The Visual Journey
            </>
          }
        />
        <PageHeroKeywordStrip />
        <GallerySection />
        <ReadyRetreatSection />
        <ContactUsSection />
      </main>
      <Footer />
    </>
  );
}
