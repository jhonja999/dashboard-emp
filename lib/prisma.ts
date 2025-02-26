import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Log para verificar la conexión a la base de datos
prisma.$connect().then(() => {
  console.log("Conexión a la base de datos establecida correctamente.");
}).catch((error) => {
  console.error("Error al conectar con la base de datos:", error);
});