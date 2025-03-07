import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers"; // Importa tu componente con "use client"

const inter = Inter({ subsets: ["latin"] });

// Exportas metadata sin problemas
export const metadata: Metadata = {
  title: "Dashboard NinaGold",
  description: "Exploración Minera",
};

// Este layout es un Server Component (NO usa "use client")
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider>
          {/* Envuelves tus children en el componente "Providers" que sí es client */}
          <Providers>
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
