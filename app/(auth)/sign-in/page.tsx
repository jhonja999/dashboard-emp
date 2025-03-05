/**
 * Archivo: app/(auth)/sign-in/page.tsx
 * Uso: Muestra la página de inicio de sesión utilizando Clerk. Redirige al usuario a /dashboard tras iniciar sesión o registrarse.
 */

"use client";
import { SignIn } from "@clerk/nextjs"; // Importa el componente de Clerk para manejar el inicio de sesión

export default function Page() {
  return (
    // Contenedor principal con estilos para centrar el contenido vertical y horizontalmente
    <div className="flex min-h-screen items-center justify-center">
      {/* Componente SignIn de Clerk, el cual maneja el proceso de inicio de sesión */}
      <SignIn afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard" />
    </div>
  );
}
