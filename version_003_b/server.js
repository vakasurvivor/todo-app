import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`port:${PORT} で起動しました: http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("サーバーの起動に失敗しました:", e);
    process.exit(1);
  }
}

startServer();
