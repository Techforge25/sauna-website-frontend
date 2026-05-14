import "./globals.css";

import type { Metadata } from "next";

import { AppProviders } from "@/components/providers/app-providers";

export const metadata: Metadata = {
  title: {
    default: "B&M Saunas",
    template: "%s | B&M Saunas",
  },
  description: "Private sauna booking platform for B&M Saunas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
