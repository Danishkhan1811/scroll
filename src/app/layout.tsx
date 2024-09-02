import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar"
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { AOSInit } from './aos'

import "react-loading-skeleton/dist/skeleton.css"
import "simplebar-react/dist/simplebar.min.css"

import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});


export const metadata: Metadata = {
  title: "Scroll",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <Providers>
        <AOSInit/>
          <body className={cn(
            'min-h-screen font-sans antialiased grainy',
            poppins.className
          )}>
            <Toaster />
            <Navbar />
            {children}
          </body>
      </Providers>
    </html>
  );
}
