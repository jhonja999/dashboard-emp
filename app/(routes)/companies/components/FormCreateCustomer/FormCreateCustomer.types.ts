/**
 * Archivo: FormCreateCustomer.types.ts
 * Uso: Define los tipos de propiedades para el componente FormCreateCustomer.
 */

import { Dispatch, SetStateAction } from "react";

export type FormCreateCustomerProps = {
  // Función para actualizar el estado que controla la visibilidad del modal de creación de cliente
  setOpenModalCreate: Dispatch<SetStateAction<boolean>>;
};
