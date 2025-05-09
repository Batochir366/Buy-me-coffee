import express, { json } from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";
const app = express();

app.use(json());
app.use(cors());

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(8080, () => {
  console.log(`server running at http://localhost:8080`);
});
