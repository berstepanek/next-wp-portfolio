import "./globals.css";
import type { Metadata } from "next";
//import { Geist } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import Header from "@/components/layout/header";

import { Anton } from "next/font/google";
import Footer from "@/components/layout/footer";
import { getGlobalStylesheet } from "@/services/global-style";
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
  title: "Medhi sefrioui",
  description: "Medhi sefrioui",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalCss = await getGlobalStylesheet();

  return (
    <>
      <html lang="en" className={`${fontTitle.variable}`}>
        <head>
          {globalCss && (
            <style
              href="wp-global-styles"
              precedence="high"
              dangerouslySetInnerHTML={{ __html: globalCss }}
            />
          )}
        </head>
        <body className={`bg-white text-slate-700`}>
          <ViewTransitions>
            <Header />
            <main>{children}</main>
            <Footer />
          </ViewTransitions>
        </body>
      </html>
    </>
  );
}
