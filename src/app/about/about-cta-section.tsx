import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export function AboutCtaSection() {
  return (
    <section className="bg-surface px-5 pb-[100px] pt-[50px] sm:px-8 lg:px-[120px]">
      <div className="mx-auto w-full max-w-[960px] overflow-hidden rounded-3xl border border-[#ffedd5] bg-primary p-10 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] sm:p-16 lg:p-[81px]">
        <div className="relative flex flex-col items-center gap-8 text-center text-white">
          <div className="pointer-events-none absolute bottom-[-172px] left-[-191px] size-64 rounded-full bg-white blur-[172px]" />
          <div className="pointer-events-none absolute right-[-160px] top-[-241px] size-64 rounded-full bg-primary blur-[172px]" />

          <div className="relative flex flex-col items-center gap-3">
            <h2 className="font-serif text-[40px] font-medium capitalize leading-[1.15] sm:text-[52px] sm:leading-[62px]">
              Experience It Yourself
            </h2>
            <p className="max-w-[554px] text-lg font-normal leading-6">
              Step into a world where heat meets harmony. Your private
              sanctuary is ready for your first session.
            </p>
          </div>

          <Button
            className="relative w-[235px]"
            hideDefaultIcon
            href={routes.services}
            variant="white"
          >
            Book Your First Session
          </Button>
        </div>
      </div>
    </section>
  );
}
