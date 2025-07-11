import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryProvider } from "./providers/react-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CAT HUB - French & Italian Energy Markets",
  description:
    "Access and compare energy markets across France and Italy with comprehensive filtering and provider data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
