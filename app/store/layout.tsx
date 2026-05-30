import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique Roasters Store",
  description: "Bring the premium taste of Cafe-brew home. Access our single-origin whole beans and artisan accessories.",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
