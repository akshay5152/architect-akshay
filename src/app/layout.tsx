import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "chkstepan | Overview",
  description:
    "Creative studio crafting modern websites with clean design, smooth animations, and high-performance development.",
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
