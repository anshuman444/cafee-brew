import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artisan Menu",
  description: "Explore our curated espresso list, single-origin pour overs, and house delicacies.",
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
