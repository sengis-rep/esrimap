import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESRI Map Application",
  description: "A Next.js application with ESRI ArcGIS mapping",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
