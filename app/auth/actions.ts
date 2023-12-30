"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email taken");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
