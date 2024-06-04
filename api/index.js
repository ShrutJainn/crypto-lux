import "dotenv/config";
import cors from "cors";

import express from "express";
import userRouter from "./routes/userRoutes.js";
import coinRouter from "./routes/coinRoutes.js";
const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/coins", coinRouter);

app.listen(3000, () => {
  console.log("Listening on port");
});
