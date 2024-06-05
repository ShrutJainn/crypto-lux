// import { Hono } from "hono";
// const app = new Hono();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

export async function signup(c: any) {
  try {
    const body = await c.req.json();
    const { success } = signupSchema.safeParse(body);
    if (!success) return c.status(403).json({ error: "Invalid input types" });

    const { username, email, name, password } = body;

    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (user)
      return c
        .status(400)
        .json({ error: "User with that username already exists" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        name,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ email }, jwtSecret);

    return c.status(200).json({ newUser, token });
  } catch (error) {
    return c.status(500).json({ error: error.message });
  }
}
