import { Button, GradientText, SectionHeading } from "@/components/ui";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils/cn";

type ReadyRetreatSectionProps = {
  className?: string;
};

export function ReadyRetreatSection({ className }: ReadyRetreatSectionProps) {
  return (
    <section
      className={cn(
        "bg-background px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[100px]",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-[62px] text-center">
        <div className="flex max-w-[760px] flex-col items-center gap-3">
          <SectionHeading className="whitespace-normal capitalize sm:whitespace-nowrap">
            Ready For Your <GradientText>Retreat?</GradientText>
          </SectionHeading>
          <p className="max-w-[516px] text-lg leading-6 text-muted">
            The perfect session is just two minutes away. Select your location
            and get your access code instantly.
          </p>
        </div>

        <Button href={routes.services}>Book Now</Button>
      </div>
    </section>
  );
}
