import "dotenv/config";
import { env } from "hono/adapter";

import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

// import userRouter from "./routes/userRoutes.js";
// import coinsRouter from "./routes/coinRoutes.js";

import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import { z } from "zod";

type Bindings = {
  JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

const secret = new TextEncoder().encode("your-256-bit-secret");

// app.route("/api/users", userRouter);
// app.route("/api/coins", coinsRouter);

// app.onError((err, c) => {
//   console.error("Error caught in onError:", err);
//   return c.text("Internal Server Error", 500);
// });

app.post("/api/users/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { success } = signupSchema.safeParse(body);
    if (!success) return c.json({ error: "Invalid input types" }, 411);

    const { username, email, name, password } = body;

    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (user)
      return c.json({ error: "User with that username already exists" }, 400);

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
    const jwt = await new SignJWT({ username })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    return c.json({ newUser, jwt }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export default app;
