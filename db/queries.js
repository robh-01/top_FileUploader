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

export async function createFile(file) {
  await prisma.file.create({
    data: {
      ...file,
    },
  });
}

export async function getFilesByUserId(userId) {
  const files = await prisma.file.findMany({
    where: {
      userId: userId,
    },
  });

  return files;
}

export async function getFileById(fileId) {
  fileId = +fileId; // converting fileId to number
  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
  });

  return file;
}
