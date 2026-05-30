import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Queue",
  description: "Cafe-brew real-time administrative preparation dashboard.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
