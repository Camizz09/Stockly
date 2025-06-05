import type { Metadata } from "next";
import "./globals.css";
import SideBar from "./_components/sidebar";
import { Inter } from "next/font/google";
import { Toaster } from "./_components/ui/sonner";

export const metadata: Metadata = {
  title: "Stockly - Sistema de Gerenciamento de Estoque",
  description: "Sistema de gerenciamento de estoque e vendas",
};

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-full">
          <SideBar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}