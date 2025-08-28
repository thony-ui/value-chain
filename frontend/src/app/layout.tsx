import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/query-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/contexts/user-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// ...existing code...
export const metadata: Metadata = {
  title: {
    default: "ValueChain Studio",
    template: "%s | ValueChain Studio",
  },
  description:
    "A collaborative platform connecting content producers and consumers for mutual benefit. Share, discover, and amplify posts to create value for everyone in the chain.",
  keywords: [
    "value chain",
    "content sharing",
    "collaboration",
    "producers",
    "consumers",
    "mutual benefit",
    "social platform",
    "community engagement",
    "content amplification",
    "network effects",
  ],
  authors: [
    {
      name: "ValueChain Studio",
    },
  ],
  creator: "ValueChain Studio",
  publisher: "ValueChain Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "ValueChain Studio - Collaborative Content Sharing Platform",
    description:
      "Connect producers and consumers to share, discover, and amplify posts. Build a value chain where everyone benefits from engagement and collaboration.",
    siteName: "ValueChain Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ValueChain Studio - Collaborative Content Sharing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ValueChain Studio - Collaborative Content Sharing Platform",
    description:
      "Connect producers and consumers to share, discover, and amplify posts. Build a value chain where everyone benefits from engagement and collaboration.",
    images: ["/og-image.png"],
    creator: "@valuechainstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#3b82f6",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#3b82f6",
    "theme-color": "#ffffff",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
