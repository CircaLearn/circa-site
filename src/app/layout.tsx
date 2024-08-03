import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Circa",
  description: "Your living dictionary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="font-normal text-slate-800 antialiased container mx-auto pb-20 mt-6 px-4 lg:px-0 lg:w-2/3">
          {children}
        </div>
      </body>
    </html>
  );
}
