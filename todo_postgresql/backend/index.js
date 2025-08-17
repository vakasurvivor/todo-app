// ./index.js

import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import { initDB } from "./db/db.js";
import apiRouter from "./api/api.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

// frontend
app.use(express.static(path.join(__dirname, "..", "public")));

// backend
app.use("/api", apiRouter);

async function startServer() {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`port:${PORT} で起動しました: http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("サーバーの起動に失敗しました:", e);
    process.exit(1);
  }
}

startServer();
