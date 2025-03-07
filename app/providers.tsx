/**
 * Archivo: providers.tsx
 * Uso: Provee el contexto de React Query a la aplicación mediante el QueryClientProvider.
 */

'use client'

import { Toaster } from '@/components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Importa el cliente y el proveedor de React Query
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react' // Importa el tipo ReactNode para definir los hijos del componente

const queryClient = new QueryClient() // Crea una instancia del cliente de React Query

/**
 * Componente Providers: Envuelve la aplicación para proveer el contexto de React Query.
 * @param {ReactNode} children - Los componentes hijos que se envuelven con el proveedor.
 * @returns Componente envuelto con el QueryClientProvider.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // storageKey="theme-ninagold" // si quieres personalizar la key
    >
      <Toaster />
      {children}
      </ThemeProvider>
    </QueryClientProvider>
    
  )
}
