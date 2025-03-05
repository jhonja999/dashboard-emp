/**
 * Archivo: lib/utils.ts
 * Uso: Provee funciones utilitarias para la manipulación de clases CSS y para guardar imágenes localmente.
 */

import { ClassValue } from "class-variance-authority/types" // Importa el tipo ClassValue para la manipulación de clases CSS
import { clsx } from "clsx" // Importa clsx para concatenar condicionalmente clases CSS
import { twMerge } from "tailwind-merge" // Importa twMerge para fusionar clases de Tailwind CSS y resolver conflictos

/**
 * Función cn: Combina y fusiona clases CSS utilizando clsx y tailwind-merge.
 * @param {ClassValue[]} inputs - Array de valores que representan clases CSS.
 * @returns {string} - Una cadena con las clases CSS fusionadas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Función saveImageLocally: Convierte un archivo de imagen a una cadena en base64 para almacenarla temporalmente.
 * @param {File} file - Archivo de imagen a convertir.
 * @returns {Promise<string>} - Una promesa que se resuelve con la imagen codificada en base64.
 */
export async function saveImageLocally(file: File): Promise<string> {
  // Convierte el archivo a base64 para almacenamiento temporal
  return new Promise((resolve, reject) => {
    const reader = new FileReader() // Crea una instancia de FileReader para leer el archivo
    reader.readAsDataURL(file) // Lee el archivo como una URL de datos en base64
    reader.onload = () => resolve(reader.result as string) // Resuelve la promesa con el resultado en base64
    reader.onerror = (error) => reject(error) // Rechaza la promesa si ocurre un error durante la lectura
  })
}
