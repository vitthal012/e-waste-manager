import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { ThemeProvider } from "@/components/providers/theme-provider"; 

import { Header } from '@/components/header';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Waste Manager", // <-- You can update the title here
  description: "Manage your e-waste responsibly.", // <-- Update description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* --- ADD THIS HEAD SECTION --- */}
      <head>
        {/* Next.js will automatically inject metadata, font links, etc. here */}
        {/* You generally don't need to add things manually here */}
      </head>
      {/* --- END OF HEAD SECTION --- */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
        
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          
          <Header /> {/* <-- Add Header Here */}
          {/* Remove the ModeToggle div that was here previously */}
          <div className="flex-grow"> {/* Optional: Helps push footer down if needed */}
            {children}
          </div>
          {/* Add <Footer /> component here later */}
       
        </ThemeProvider>
      </body>
    </html>
  );
}