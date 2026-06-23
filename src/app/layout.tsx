import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brick & Soul | Architecture and Interiors",
  description:
    "Architecture, interior design, 3D visualization, and turnkey execution for soulful spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
