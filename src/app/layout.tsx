import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar"
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Providers from "@/components/Providers";

import "react-loading-skeleton/dist/skeleton.css"
import "simplebar-react/dist/simplebar.min.css"

import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});


export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <Providers>
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
