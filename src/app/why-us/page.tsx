import { ContactUsSection } from "@/components/common/contact-us-section";
import { PageHero, PageHeroKeywordStrip } from "@/components/common/page-hero";
import { ReadyRetreatSection } from "@/components/common/ready-retreat-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import { WhySaunasSection } from "../home/why-saunas-section";
import { BmStandardSection } from "./bm-standard-section";
import { CedarTechSection } from "./cedar-tech-section";

export default function WhyUsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          backgroundClassName="bg-[length:100%_100%]"
          className="h-[541px] sm:h-[541px] lg:h-[541px]"
          contentClassName="items-end pb-[60px] lg:items-end lg:px-[120px] lg:pt-0"
          description="B&M Saunas redefines the traditional heat ritual through a lens of modern engineering. We prioritize your time, your privacy, and the absolute purity of the experience."
          imageSrc="/Images/whyUs-section.png"
          title={
            <>
              The Future of Wellness
              <br />
              Engineering.
            </>
          }
        />
        <PageHeroKeywordStrip />
        <WhySaunasSection />
        <CedarTechSection />
        <BmStandardSection />
        <ReadyRetreatSection />
        <ContactUsSection />
      </main>
      <Footer />
    </>
  );
}
