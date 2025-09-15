import app from "./src/app.js";
import { initDB } from "./src/model/taskModel.js";

const PORT = process.env.PORT || 3003;

async function startServer() {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`🚀 Node.js Server を起動しました: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Node.js Server の起動に失敗しました:", err);
    process.exit(1);
  }
}

startServer();
