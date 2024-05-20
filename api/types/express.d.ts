// types/express.d.ts
import { User as PrismaUser } from "@prisma/client"; // Assuming you have a User model in Prisma

declare global {
  namespace Express {
    interface User extends PrismaUser {}

    interface Request {
      user?: User;
    }
  }
}
