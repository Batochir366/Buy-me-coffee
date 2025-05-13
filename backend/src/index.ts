import express, { json } from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";
import cookieParser from "cookie-parser";
const app = express();

app.use(json());
app.use(
  cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  })
);
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.get("/", (_, res) => {
  res
    .cookie("test", "test", {
      maxAge: 1000000,
      httpOnly: true,
      // signed: true,
      secure: false,
    })
    .send();
});
app.listen(8080, () => {
  console.log(`server running at http://localhost:8080`);
});
