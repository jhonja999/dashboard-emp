/**
 * Archivo: uploadthing_router.ts
 * Uso: Configura y documenta el enrutador de carga de archivos usando Uploadthing y Clerk para autenticación.
 */

import { auth } from "@clerk/nextjs/server" // Importa Clerk para la autenticación del usuario
import { createUploadthing, type FileRouter } from "uploadthing/next" // Importa funciones y tipos de Uploadthing para manejar las cargas de archivos

// Crea una instancia de Uploadthing para configurar el enrutador de archivos
const f = createUploadthing()

export const ourFileRouter = {
  // Define el endpoint imageUploader para subir imágenes
  imageUploader: f({ image: { maxFileSize: "4MB" } }) // Configura la subida de imágenes con un tamaño máximo de 4MB
    .middleware(async () => {
      const { userId } = await auth() // Obtiene el ID del usuario autenticado
      if (!userId) throw new Error("Unauthorized") // Lanza un error si el usuario no está autenticado
      return { userId } // Retorna el ID del usuario para su uso posterior en el flujo de carga
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId) // Registra en consola el ID del usuario que completó la carga
      console.log("File URL:", file.ufsUrl) // Registra en consola la URL del archivo cargado
      return { uploadedBy: metadata.userId } // Retorna información indicando quién realizó la carga
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter // Exporta el tipo de nuestro enrutador para su uso en otras partes de la aplicación
