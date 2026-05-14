import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GradientText } from "@/components/ui/section-heading";
import { Textarea } from "@/components/ui/textarea";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils/cn";

type ContactUsSectionProps = {
  className?: string;
};

const contactFields = [
  { label: "Name", name: "name", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Subject", name: "subject", type: "text" },
] as const;

export function ContactUsSection({ className }: ContactUsSectionProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#101828] px-5 py-20 sm:px-8 lg:px-[120px] lg:py-[100px]",
        className,
      )}
    >
      <Image
        fill
        alt="Guest relaxing in a sauna"
        className="absolute inset-0 -z-20 object-cover"
        sizes="100vw"
        src="/Images/common/contact-section-bg.png"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/30"
      />

      <div className="mx-auto flex min-h-[602px] w-full max-w-[1200px] items-center justify-end">
        <div className="w-full max-w-[529px] overflow-hidden rounded-xl border-t border-primary bg-white p-6 sm:p-8">
          <h2 className="font-serif text-[36px] font-medium capitalize leading-[1.18] text-foreground sm:text-[42px] sm:leading-[55px]">
            Have A Question?
            <br />
            Get <GradientText>In Touch</GradientText>
          </h2>

          <form className="mt-8 flex flex-col gap-[22px]">
            <div className="flex flex-col gap-6">
              {contactFields.map((field) => (
                <Input
                  className="h-[51px] rounded-xl bg-white px-[13px] py-3.5 focus:!border-primary focus-visible:!border-primary"
                  key={field.name}
                  name={field.name}
                  placeholder={field.label}
                  type={field.type}
                />
              ))}
              <Textarea
                className="h-[117px] rounded-xl bg-white px-[13px] py-3.5 focus:!border-primary focus-visible:!border-primary"
                name="message"
                placeholder="Message"
              />
            </div>

            <Button fullWidth href={routes.contact}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
