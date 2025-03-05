/**
 * Archivo: lib/formatPrice.tsx
 * Uso: Proporciona una función para formatear precios a la moneda local de Perú (PEN).
 */

/**
 * Formatea un número como un precio en la moneda local (PEN) con el formato de 'es-PE'.
 * @param {number} price - El precio a formatear.
 * @returns {string} - El precio formateado en moneda peruana.
 */
export function formatPrice(price: number): string {
  const priceFormatted = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  });
  const finalPrice = priceFormatted.format(price); 
  return finalPrice;
}
