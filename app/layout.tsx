/**
 * Archivo: app/layout.tsx
 * Uso: Layout raíz de la aplicación. Configura Clerk para autenticación, aplica la fuente Inter y habilita el cambio de temas. 
 *      También incluye el componente Toaster para notificaciones.
 */

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

// Metadatos para la aplicación
export const metadata: Metadata = {
  title: "Dashboard NinaGold",
  description: "Exploración Minera",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
