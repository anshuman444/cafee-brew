import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Journey",
  description: "A visual walkthrough of the warmth, precision, and artistry behind Cafe-brew.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
