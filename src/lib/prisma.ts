// import "server-only";
// import { PrismaClient } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";
//
// const createPrismaClient = () =>
//   new PrismaClient({
//     log:
//       process.env.NODE_ENV === "development"
//         ? ["query", "error", "warn"]
//         : ["error"],
//   }).$extends(withAccelerate());
//
// type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;
//
// const globalForPrisma = globalThis as unknown as {
//   prisma?: ExtendedPrismaClient;
// };
//
// export const prisma: ExtendedPrismaClient =
//   globalForPrisma.prisma ?? createPrismaClient();
//
// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }
//
// export default prisma;


import "server-only";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const createBaseClient = () =>
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

const createPrismaClient = () => {
  const base = createBaseClient();
  if (process.env.NODE_ENV === "production") {
    return base.$extends(withAccelerate());
  }
  return base;
};

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;
const globalForPrisma = globalThis as unknown as { prisma?: ExtendedPrismaClient };

export const prisma: ExtendedPrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
