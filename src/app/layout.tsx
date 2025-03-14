import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/styles/main.scss";
import { Footer } from "@/components/Shared/Footer";
import { Navbar } from "@/components/Shared/Navbar";

const inter = Inter({
  weight:['100','200','300','400','500','600','700','800','900'],
  style:['italic','normal'],
  subsets:['latin'],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuditAI",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${inter.className}`}>
        {/** Navbar */}
        <Navbar/>

        {children}

        {/** Footer */}
        <Footer/>
      </body>

    </html>
  );
}
