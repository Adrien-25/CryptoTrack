
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import {FavoritesProvider} from "@/app/context/FavoritesContext";
import React from "react";
import { FavoritesProvider } from "./context/FavoritesContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CryptoTrack",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
