import "./globals.css";
import type { Metadata } from "next";
//import { Geist } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import Header from "@/components/layout/header";

import { Anton } from "next/font/google";
const fontTitle = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-title",
});
/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});*/

export const metadata: Metadata = {
  title: "Sang Mele Compagnie, théâtre",
  description:
    "La compagnie Sang Mele propose des spectacles professionnels de théâtre. De la création originale, à la modernisation de texte classique, la compagnie soigne toujours son casting et la mise à scène de ces spectacles",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${fontTitle.variable}`}>
        <body className={`bg-slate-900 text-white`}>
          <Header />

          <main>{children}</main>
          <footer className="p-2 text-center">
            © {new Date().getFullYear()} – Sang Mélé Compagnie
          </footer>
        </body>
      </html>
    </ViewTransitions>
  );
}
