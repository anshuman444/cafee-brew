import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the passion, craft, and partnerships that form the foundation of Cafe-brew cafe.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
