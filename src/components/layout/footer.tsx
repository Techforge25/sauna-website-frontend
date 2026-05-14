import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";

import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const legalLinks = [
  { href: routes.privacyPolicy, label: "Privacy Policy" },
  { href: routes.terms, label: "Terms and Conditions" },
  { href: routes.bookingRules, label: "Booking Rules" },
] as const;

const footerCopy =
  "Premium private sauna experiences designed for restoration and focus. Discover the transformative power of heat in a space dedicated to your well-being.";

const paymentMethods = [
  {
    alt: "Stripe",
    height: 33,
    src: "/Images/payment/stripe.svg",
    width: 82,
  },
  {
    alt: "PayPal",
    height: 33,
    src: "/Images/payment/paypal.svg",
    width: 98,
  },
  {
    alt: "Revolut",
    height: 33,
    src: "/Images/payment/revolut.svg",
    width: 104,
  },
] as const;

const contactLinks = [
  {
    href: `mailto:${siteConfig.supportEmail}`,
    icon: HiOutlineEnvelope,
    label: siteConfig.supportEmail,
  },
  {
    href: `tel:${siteConfig.supportPhone.replace(/[^+\d]/g, "")}`,
    icon: HiOutlinePhone,
    label: siteConfig.supportPhone,
  },
] as const;

const footerColumnTitleClass =
  "font-serif text-[22px] font-semibold leading-6 text-foreground";

const footerTextLinkClass =
  "text-lg leading-6 text-muted transition-colors hover:text-primary";

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-surface", className)}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-5 py-16 sm:px-8 lg:flex-row lg:gap-[115px] lg:px-[120px] lg:pb-[50px] lg:pt-[100px]">
        <FooterBrand />

        <div className="grid flex-1 grid-cols-1 gap-12 sm:grid-cols-2 lg:gap-[115px]">
          <ConnectColumn />
          <LegalColumn />
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
}

function FooterBrand() {
  return (
    <div className="flex w-full max-w-[421px] flex-col items-start gap-8">
      <Link
        aria-label="B&M Saunas home"
        className="relative h-[87px] w-[80px] shrink-0"
        href={routes.home}
      >
        <Image
          alt="B&M Saunas"
          className="object-contain"
          fill
          sizes="80px"
          src="/Images/header-logo.png"
        />
      </Link>

      <p className="max-w-[421px] text-lg leading-6 text-muted">
        {footerCopy}
      </p>

      <PaymentMethods />
    </div>
  );
}

function PaymentMethods() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-medium uppercase leading-[18px] tracking-[0.12em] text-muted">
        Secure Payments
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {paymentMethods.map((method) => (
          <Image
            alt={method.alt}
            className="h-[33px] w-auto rounded-sm border border-border bg-white object-contain"
            height={method.height}
            key={method.alt}
            src={method.src}
            width={method.width}
          />
        ))}
      </div>
    </div>
  );
}

function FooterColumn({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-[30px]">
      <h2 className={footerColumnTitleClass}>{title}</h2>
      {children}
    </div>
  );
}

function ConnectColumn() {
  return (
    <FooterColumn title="Connect">
      <div className="flex flex-col gap-4 text-lg leading-6 text-muted">
        {contactLinks.map((link) => (
          <ContactLink
            href={link.href}
            icon={link.icon}
            key={link.href}
            label={link.label}
          />
        ))}

        <div className="flex items-center gap-3">
          <HiOutlineMapPin aria-hidden="true" className="size-6" />
          <span>{siteConfig.address}</span>
        </div>
      </div>
    </FooterColumn>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: IconType;
  label: string;
}) {
  return (
    <a className="flex items-center gap-3 transition-colors hover:text-primary" href={href}>
      <Icon aria-hidden="true" className="size-6" />
      <span>{label}</span>
    </a>
  );
}

function LegalColumn() {
  return (
    <FooterColumn title="Legal">
      <nav aria-label="Legal navigation" className="flex flex-col gap-4">
        {legalLinks.map((link) => (
          <Link className={footerTextLinkClass} href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </FooterColumn>
  );
}

function FooterBottom() {
  return (
    <div className="bg-surface px-5 sm:px-8 lg:px-[120px]">
      <div className="mx-auto h-[1px] w-full max-w-[1200px] bg-gradient-to-r from-transparent via-[rgba(248,73,6,0.45)] to-transparent" />
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-center text-center text-lg leading-6 text-muted">
        <p>&copy; 2026 B&amp;M Saunas. All rights reserved.</p>
      </div>
    </div>
  );
}
