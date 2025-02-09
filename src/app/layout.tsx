import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ToggleTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahmoud Search Engine",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mt-8  flex justify-center items-center ">
        <button className="px-4 py-2 bg-gray-700 text-white rounded-2xl hover:bg-blue-800 transition-colors duration-300 "
                id="theme-toggle"> 
                Toggle Theme
        </button>
        </div>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
