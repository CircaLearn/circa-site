import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body
        className={`${inter.className} p-4 md:p-10 mt-12 font-normal text-slate-800 antialiased`}
      >
        <div className="container mx-auto px-4 lg:px-0 lg:w-2/3">
          {children}
        </div>
      </body>
    </html>
  );
}
