import prisma from "./prisma.js";

export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("DATABASE connection failed:", error);
  }
}
