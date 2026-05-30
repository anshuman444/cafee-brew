import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Events",
  description: "Arts & Espresso. Join us for intimate musical performances, comedy nights, and workshops.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
