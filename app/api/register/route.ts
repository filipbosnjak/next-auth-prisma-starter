import { NextRequest, NextResponse } from "next/server";
import { RegisterInput } from "@/app/register/components/RegisterAuthForm";
import bcrypt from "bcrypt";
import prisma from "@/prisma/prisma";
import { Prisma } from ".prisma/client";
import UserCreateInput = Prisma.UserCreateInput;

export type RegisterResponse = {
  message: string;
};
export async function POST(
  req: NextRequest,
  res: NextResponse<RegisterResponse>,
) {
  const userInput = (await req.json()) as RegisterInput;
  const foundUser = await prisma.user.findUnique({
    where: {
      email: userInput.email,
    },
  });
  if (foundUser) {
    return Response.json({
      message: "User already exists",
    });
  } else {
    const hashedPassword = await bcrypt.hash(userInput.password, 10);

    await prisma.user.create({
      data: {
        email: userInput.email,
        password: hashedPassword,
        username: userInput.email,
        role: "USER",
      },
    });
    return Response.json({
      message: "User created",
    });
  }
}
