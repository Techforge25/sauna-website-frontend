import {
  BulletItem,
  BulletList,
  LegalContent,
  LegalParagraph,
  LegalSection,
} from "@/components/common/legal-content";

const bookingSessionItems = [
  "Every session is strictly 50 minutes. Guests must vacate the sauna room within this timeframe to allow for cleaning and the next guest.",
  "Access codes are generated instantly upon payment and are valid only for the specific time slot booked.",
  "B&M Saunas operates as a guest-only service; no account creation is required, but a valid email is necessary to receive your access code.",
] as const;

const safetyItems = [
  "Consult with a physician before using the sauna if you have high blood pressure, heart conditions, or are pregnant.",
  "Stay hydrated before, during, and after your session.",
  "Exit the sauna immediately if you feel dizzy, nauseous, or lightheaded.",
  "For your safety, alcohol and drug use are not permitted within the facility.",
] as const;

const cancellationItems = [
  {
    label: "Manual Refund:",
    text: "Upon receiving your request, our administration team will review the details. If approved, a manual refund will be initiated to your original payment method.",
  },
  {
    label: "Admin Approval:",
    text: "Refunds are not automatic and require manual verification by an administrator. Please allow 3-5 business days for the refund to be processed once accepted.",
  },
  {
    label: "Rescheduling:",
    text: "You may request to reschedule your session up to 4 hours before the start time, subject to admin approval and availability.",
  },
] as const;

const propertyConductItems = [
  "Guests are responsible for any damage caused to the sauna or facility during their session beyond normal wear and tear.",
  "Please respect the privacy of other guests entering or leaving adjacent suites.",
  "No pets or smoking are allowed on the premises.",
] as const;

export function TermsAndConditionsContent() {
  return (
    <LegalContent title="Terms and Conditions" updatedAt="October 24, 2024">
      <LegalParagraph>
        Welcome to B&amp;M Saunas. By accessing or using our services, you agree
        to be bound by these terms. Please read them carefully.
      </LegalParagraph>

      <LegalSection title="Booking & Sessions">
        <BulletList>
          {bookingSessionItems.map((item) => (
            <BulletItem key={item}>{item}</BulletItem>
          ))}
        </BulletList>
      </LegalSection>

      <LegalSection title="Health & Safety">
        <LegalParagraph>
          Your safety is our priority. By using the sauna, you acknowledge and
          agree to the following:
        </LegalParagraph>
        <BulletList>
          {safetyItems.map((item) => (
            <BulletItem key={item}>{item}</BulletItem>
          ))}
        </BulletList>
      </LegalSection>

      <LegalSection title="Cancellations & Refunds">
        <LegalParagraph>
          We handle cancellations with a personalized, manual review process to
          ensure fairness:
        </LegalParagraph>
        <BulletList>
          {cancellationItems.map((item) => (
            <BulletItem key={item.label}>
              <span className="font-semibold text-foreground">
                {item.label}
              </span>{" "}
              {item.text}
            </BulletItem>
          ))}
        </BulletList>
      </LegalSection>

      <LegalSection title="Property Conduct">
        <LegalParagraph>
          Just as we engineer our saunas for maximum thermal efficiency, we
          engineer our digital systems for maximum security. We employ Thermal
          Encryption protocols, our proprietary multi-layer security approach to
          ensure your sensitive booking and payment details are shielded from
          unauthorized access.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Your Privacy Rights">
        <BulletList>
          {propertyConductItems.map((item) => (
            <BulletItem key={item}>{item}</BulletItem>
          ))}
        </BulletList>
      </LegalSection>
    </LegalContent>
  );
}
