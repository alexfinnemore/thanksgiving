import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Friendsgiving 2025",
  description: "Join us for a feast!",
  openGraph: {
    title: "Friendsgiving 2025",
    description: "Join us for a feast!",
    images: [
      {
        url: "/background.jpg",
        width: 1200,
        height: 630,
        alt: "Friendsgiving 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Friendsgiving 2025",
    description: "Join us for a feast!",
    images: ["/background.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelFont.variable} font-pixel antialiased bg-black text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
