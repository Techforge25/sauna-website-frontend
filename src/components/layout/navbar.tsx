"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: routes.home, label: "Home" },
  { href: routes.about, label: "About us" },
  { href: routes.whyUs, label: "Why us" },
  { href: routes.services, label: "Services" },
  { href: routes.gallery, label: "Gallery" },
  // { href: routes.contact, label: "Contact us" },
] as const;

type NavbarProps = {
  className?: string;
};

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function isActiveRoute(href: string) {
    if (href === routes.home) return pathname === routes.home;

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "relative h-[72px] w-full bg-background-soft",
        className,
      )}
      ref={headerRef}
    >
      <div className="relative mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 sm:px-8 xl:px-[120px]">
        <Link
          aria-label="B&M Saunas home"
          className="relative h-[60px] w-[56px] shrink-0"
          href={routes.home}
        >
          <Image
            alt="B&M Saunas"
            className="object-contain"
            fill
            priority
            sizes="56px"
            src="/Images/header-logo.png"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[43px] lg:flex"
        >
          {navItems.map((item) => {
            const isActive = isActiveRoute(item.href);

            return (
              <Link
                className={cn(
                  "whitespace-nowrap text-base font-normal leading-[1.6] tracking-[-0.02em] text-foreground transition-colors hover:text-primary",
                  isActive && "text-primary",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Button
          className="hidden lg:inline-flex"
          hideDefaultIcon
          href={routes.contact}
        >
          Contact Us
        </Button>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="inline-flex size-11 items-center justify-center rounded-pill border border-border bg-surface text-foreground lg:hidden"
          onClick={() => setIsMenuOpen((value) => !value)}
          type="button"
        >
          {isMenuOpen ? (
            <HiXMark aria-hidden="true" className="size-6" />
          ) : (
            <HiBars3 aria-hidden="true" className="size-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 top-[72px] z-50 w-full border-y border-border bg-background-soft px-5 py-6 shadow-card sm:px-8 lg:hidden"
            exit={{ opacity: 0, y: -8 }}
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-5">
              {navItems.map((item) => {
                const isActive = isActiveRoute(item.href);

                return (
                  <Link
                    className={cn(
                      "text-base font-normal leading-[1.6] tracking-[-0.02em] text-foreground transition-colors hover:text-primary",
                      isActive && "text-primary",
                    )}
                    href={item.href}
                    key={item.href}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Button
                className="mt-2"
                fullWidth
                hideDefaultIcon
                href={routes.contact}
                onClick={closeMenu}
              >
                Contact Us
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
