import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pinsite Web Studio | Standalone Website Generation Engine",
  description: "Universal visual website generation SaaS with real-time split-screen builder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0B0C0E] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
