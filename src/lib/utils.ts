import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string){
  if(typeof window !== "undefined") return path
  if(process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}$path`
  return `http://localhost:${process.env.PORT ?? 3000}${path}`
}

export function constructMetadata({
  title = "Scroll - Bring your documents to life",
  description = "Scroll - Your intelligent PDF chatbot web app designed to streamline document navigation and enhance your reading experience. With Scroll, you can effortlessly ask questions about your PDFs, summarize content, and locate specific information in seconds.",
  image = "https://github.com/Danishkhan1811/scroll/blob/2e9e1074e1d1b68948ebb2db74ad7c4e8a827b74/public/thumbnail.png",
  icons = "../../favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@kainy_onodera",
    },
    icons,
    metadataBase: new URL("https://pdfpal-next-js.vercel.app/"),

    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
