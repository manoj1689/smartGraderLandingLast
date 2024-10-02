
import type { Metadata } from "next";
import { Spline_Sans} from "next/font/google";
import "./globals.css";

const spline_Sans = Spline_Sans({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "SmartGrader Landing Page",
  description: "Made by SmartGrader Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spline_Sans.className}>{children}</body>
    </html>
  );
}
