import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Table",
  description: "Reserve a private table at Cafe-brew for curated coffee flights and tastings.",
};

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
