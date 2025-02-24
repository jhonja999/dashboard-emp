//lib/formatPrice.tsx

export function formatPrice(price: number): string {
    const priceFormatted = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    });
    const finalPrice = priceFormatted.format(price); 
    return finalPrice;
  }