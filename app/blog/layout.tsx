import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee Journal",
  description: "Discover the latest news, brewing techniques, and coffee stories from our roasting experts.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
