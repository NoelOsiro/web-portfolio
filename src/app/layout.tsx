
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


import { PageSetup } from "@/components/PageSetup";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Noel Osiro - Software Engineer',
  description: 'Portfolio and blog of Your Name, a software engineer.',
}




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
            <PageSetup>{children}</PageSetup>

      </body>
    </html>
  );
}
