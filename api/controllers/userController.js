import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
import { z } from "zod";

const jwtSecret = process.env.JWT_SECRET;

const signupSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

export async function signupUser(req, res) {
  try {
    const { success } = signupSchema.safeParse(req.body);
    if (!success) return res.status(403).json({ error: "Invalid input tyeps" });

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
