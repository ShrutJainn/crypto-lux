import { jwtVerify } from "jose";

export async function protectedRoute(c: any, next: Function) {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 411);
  }
  const token = authHeader.split(" ")[1];
  const jwtSecret = c.env.JWT_SECRET;
  const secret = new TextEncoder().encode(jwtSecret);
  try {
    const { payload } = await jwtVerify(token, secret);
    c.set("user", payload);
    await next();
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
}
