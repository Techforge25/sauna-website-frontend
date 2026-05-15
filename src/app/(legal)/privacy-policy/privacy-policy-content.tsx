import {
  BulletItem,
  BulletList,
  LegalContent,
  LegalParagraph,
  LegalSection,
  PartnerCard,
} from "@/components/common/legal-content";

const informationItems = [
  {
    label: "Personal Data:",
    text: "Name, email address, phone number, and physical address for consultation and delivery.",
  },
  {
    label: "Usage Data:",
    text: "Information on how you navigate our website, including IP addresses and device identifiers.",
  },
  {
    label: "Booking Details:",
    text: "Specific preferences for sauna designs, wood choices, and technical requirements provided during consultations.",
  },
] as const;

const usageItems = [
  "Facilitating the manufacturing and custom installation of your sauna unit.",
  "Communicating updates regarding your order status and wellness recommendations.",
  "Improving our engineering processes through anonymized usage analytics.",
  "Maintaining the security of our digital architecture.",
] as const;

const partnerCards = [
  {
    bgClassName: "bg-[#6974de]",
    description: "Secure payment processing for all luxury installations.",
    logo: {
      alt: "Stripe",
      height: 22,
      src: "/Images/payment/stripe.svg",
      width: 56,
    },
    title: "Stripe",
  },
  {
    bgClassName: "bg-[#179bd7]",
    description: "Alternative encrypted transaction for our clients.",
    logo: {
      alt: "PayPal",
      height: 22,
      src: "/Images/payment/paypal.svg",
      width: 64,
    },
    title: "PayPal",
  },
  {
    bgClassName: "border border-primary bg-[#141110]",
    description: "Business banking and verified commercial transfers.",
    logo: {
      alt: "Revolut",
      height: 22,
      src: "/Images/payment/revolut.svg",
      width: 68,
    },
    title: "Revolut",
  },
] as const;

export function PrivacyPolicyContent() {
  return (
    <LegalContent title="Privacy Policy" updatedAt="October 24, 2024">
          <LegalSection title="Terms We Agree To">
            <LegalParagraph>
              At B&amp;M Saunas, we are committed to protecting the privacy and
              security of our clients. This Privacy Policy outlines how we
              collect, use, and safeguard your personal information as you
              interact with our thermal wellness engineering services and
              high-end sauna collections.
            </LegalParagraph>
          </LegalSection>

          <LegalSection title="Information We Collect">
            <LegalParagraph>
              To provide our bespoke sauna engineering and installation
              services, we collect various types of information, including:
            </LegalParagraph>
            <BulletList>
              {informationItems.map((item) => (
                <BulletItem key={item.label}>
                  <span className="font-bold text-foreground">
                    {item.label}
                  </span>{" "}
                  {item.text}
                </BulletItem>
              ))}
            </BulletList>
          </LegalSection>

          <LegalSection title="How We Use Your Information">
            <LegalParagraph>
              We utilize the data collected to ensure the highest standard of
              &quot;Thermal Minimalist&quot; service delivery:
            </LegalParagraph>
            <BulletList>
              {usageItems.map((item) => (
                <BulletItem key={item}>{item}</BulletItem>
              ))}
            </BulletList>
          </LegalSection>

          <LegalSection title="Data Sharing & Third Parties">
            <LegalParagraph>
              We do not sell your personal data. We only share information with
              trusted partners necessary for business operations:
            </LegalParagraph>

            <div className="grid gap-[18px] lg:grid-cols-3">
              {partnerCards.map((partner) => (
                <PartnerCard key={partner.title} {...partner} />
              ))}
            </div>
          </LegalSection>

          <LegalSection title="Security Of Your Data">
            <LegalParagraph>
              Just as we engineer our saunas for maximum thermal efficiency, we
              engineer our digital systems for maximum security. We employ{" "}
              <span className="font-bold text-foreground">
                Thermal Encryption
              </span>{" "}
              protocols, our proprietary multi-layer security approach to ensure
              your sensitive booking and payment details are shielded from
              unauthorized access.
            </LegalParagraph>
          </LegalSection>

          <LegalSection title="Your Privacy Rights">
            <LegalParagraph>
              You have the right to request access to the personal data we hold
              about you, to request corrections, or to ask for the deletion of
              your records. To exercise these rights, please contact our privacy
              compliance officer.
            </LegalParagraph>
          </LegalSection>
    </LegalContent>
  );
}
