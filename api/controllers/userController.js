import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
import { number, z } from "zod";

const jwtSecret = process.env.JWT_SECRET;

const signupSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function signupUser(req, res) {
  try {
    const { success } = signupSchema.safeParse(req.body);
    if (!success) return res.status(403).json({ error: "Invalid input types" });

    const { email, name, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } });
    console.log(user);
    if (user) return res.status(400).json({ error: "User already exists" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ email }, jwtSecret);

    return res.status(200).json({ newUser, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { success } = loginSchema.safeParse(req.body);
    if (!success) return res.status(411).json({ error: "Invalid inputs" });

    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });

    const isValidPassword = bcrypt.compareSync(password, user?.password);
    if (!user || !isValidPassword)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ email }, jwtSecret);

    return res
      .status(200)
      .json({ msg: "User logged in successfully", token, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const { userId } = req.params;
    const newId = parseInt(userId);

    const user = await prisma.user.findUnique({
      where: {
        id: newId,
      },
      select: {
        email: true,
        name: true,
      },
    });

    if (!user) return res.status(411).json({ error: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
