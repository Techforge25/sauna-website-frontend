import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineHome, HiOutlineSparkles } from "react-icons/hi2";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

const helpfulLinks = [
  {
    href: routes.services,
    label: "Services",
  },
  {
    href: routes.bookingRules,
    label: "Booking Rules",
  },
  {
    href: routes.contact,
    label: "Contact",
  },
] as const;

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-surface px-5 py-20 sm:px-8 lg:px-[120px] lg:py-[120px]">
        <section className="mx-auto flex min-h-[520px] w-full max-w-[1200px] items-center justify-center">
          <div className="relative w-full overflow-hidden rounded-[24px] border border-border bg-white px-5 py-14 text-center shadow-[0_24px_70px_rgba(20,17,16,0.08)] sm:px-10 lg:px-20 lg:py-20">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-[260px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(248,73,6,0.18),transparent_70%)]"
            />

            <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center">
              <div className="mb-8 flex size-[72px] items-center justify-center rounded-full border border-[#fae20f] bg-[rgba(253,199,178,0.36)] text-primary">
                <HiOutlineSparkles aria-hidden="true" className="size-8" />
              </div>

              <p className="mb-3 text-sm font-semibold uppercase leading-5 tracking-[0.18em] text-primary">
                404 Error
              </p>

              <h1 className="font-serif text-[44px] font-medium leading-[1.1] text-foreground sm:text-[58px] lg:text-[72px] lg:leading-[74px]">
                Page Not Found
              </h1>

              <p className="mt-6 max-w-[620px] text-base leading-[1.7] text-muted sm:text-lg">
                The page you are looking for does not exist or the link has
                changed. You can return home or continue to the booking flow.
              </p>

              <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
                <Button href={routes.home} leftIcon={<HiOutlineHome />}>
                  Go Home
                </Button>
                <Button
                  href={routes.bookingStart}
                  leftIcon={<HiOutlineArrowLeft />}
                  variant="outline"
                >
                  Start Booking
                </Button>
              </div>

              <nav
                aria-label="Helpful pages"
                className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-base leading-6 text-muted"
              >
                {helpfulLinks.map((link) => (
                  <Link
                    className="transition-colors hover:text-primary"
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
