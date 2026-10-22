import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "path";

import { connectDatabase } from "./config/db";
import userRoutes from "./routes/userRoutes";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), "client")));

app.use("/api/users", userRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    message: "Server is running"
  });
});

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();