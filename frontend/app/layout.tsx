import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "onepage — Turn your resume into a stunning portfolio",
    template: "%s · onepage",
  },
  description:
    "Upload your resume and get an award-winning personal portfolio website in seconds. Handcrafted, not templated.",
  keywords: [
    "portfolio generator",
    "resume to website",
    "AI portfolio",
    "personal website",
    "developer portfolio",
  ],
  metadataBase: new URL("https://onepage.app"),
  openGraph: {
    title: "onepage — Turn your resume into a stunning portfolio",
    description:
      "Upload your resume and get an award-winning personal portfolio website in seconds.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
