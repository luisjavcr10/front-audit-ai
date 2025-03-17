import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import "@/styles/main.scss";
import { Footer } from "@/components/Shared/Footer";
import { Navbar } from "@/components/Shared/Navbar";

const beVietmanPro= Be_Vietnam_Pro({
  weight:['100','200','300','400','500','600','700','800','900'],
  style:['italic','normal'],
  subsets:['latin'],
})

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

      <body className={`${beVietmanPro.className}`}>
        {/** Navbar */}
        <Navbar/>

        {children}

        {/** Footer */}
        <Footer/>
      </body>

    </html>
  );
}
