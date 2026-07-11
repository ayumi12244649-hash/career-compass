import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SWRegister from "./sw-register";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Career Compass",
    template: "%s | Career Compass",
  },

  description:
    "AIが就職活動をサポートする就活管理アプリ。企業管理・ES管理・面接メモ・AI添削を一つにまとめたキャリア支援ツール。",

  applicationName: "Career Compass",

  manifest: "/manifest.webmanifest",

  themeColor: "#2563EB",

  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },

  keywords: [
    "就活",
    "AI",
    "ES",
    "面接",
    "就職活動",
    "Career Compass",
  ],

  authors: [
    {
      name: "OKITA LAB",
    },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SWRegister />
        {children}

        <Toaster
          position="top-right"
          richColors
        />
      </body>
    </html>
  );
}