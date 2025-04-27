import { hash } from "bcryptjs";
import { prisma } from "./prismaClient.js";

import { hashPassword } from "../utils/hashPassword.js";

// user object is passed as argument and user is created based on it
export async function createUser(user) {
  const hashedPassword = await hashPassword(user.password);

  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
    },
  });
}
