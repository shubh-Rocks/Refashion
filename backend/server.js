import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import sessionMiddleware from "./src/configs/session.js";
import authRoutes from "./src/routes/auth.route.js";
import errorHandler from "./src/middlewares/errorHandler.js";
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "ok",
    success: true,
  });
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("server is running in port:", 5000);
});
