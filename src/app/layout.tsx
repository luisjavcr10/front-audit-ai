import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "@/styles/main.scss";
import { Footer } from "@/components/Shared/Footer";
import { Navbar } from "@/components/Shared/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CSVProvider } from "@/context/CSVContext";

const beVietmanPro= Be_Vietnam_Pro({
  weight:['100','200','300','400','500','600','700','800','900'],
  style:['italic','normal'],
  subsets:['latin'],
})

export const metadata: Metadata = {
  title: "AuditAI",
  description: "App with deep seek api integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={beVietmanPro.className}>
        <ThemeProvider>
        <AuthProvider>
        <CSVProvider>
          {/** Navbar */}
          <Navbar/>
          {/** Children */}
          {children}
          {/** Footer */}
          <Footer/>
        </CSVProvider>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
