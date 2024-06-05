import { Hono } from "hono";
import { signup } from "../controllers/userController.ts";

const userRouter = new Hono();

userRouter.route("/signup", signup);

export default userRouter;
