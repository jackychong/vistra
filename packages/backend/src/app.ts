import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import foldersRouter from "./routes/folders.js";

const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Health check route
app.get("/health", (_req: Request, res: Response): void => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/folders", foldersRouter);

export default app;
