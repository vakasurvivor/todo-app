// ./src/app.js

import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import tasksRouter from "./router/tasksRouter.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// frontend (static files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "public")));

// backend (restFull API)
app.use("/api", tasksRouter);

// middleware (error handling)
app.use(errorHandler);

export default app;
