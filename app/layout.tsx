import { Toaster } from "@/components/ui/sonner";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Poppins, Roboto } from "next/font/google";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";

import "swiper/css";
import "./globals.css";
import { QueryClientProvider } from "@/lib/query-client";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bart.az",
  description: "Your best place to trade.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.variable} ${poppins.variable} ${inter.variable} ${roboto.variable} antialiased`}
      >
        <NextTopLoader />
        <QueryClientProvider>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  controlHeight: 56,
                },
              },
            }}
          >
            <Toaster />
            <Suspense>{children}</Suspense>
          </ConfigProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
