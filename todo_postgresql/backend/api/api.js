// ./api/api.js

import express from "express";
import {
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../db/db.js";

const router = express.Router();

router.head("/tasks", async (req, res) => {
  try {
    await getAllTasks();
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
});

/**
 * 追加（CREATE）
 * @param {string} text
 * @returns {Promise<object>}
 */
router.post("/tasks", async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({
      message: "テキストの入力は必須です。",
    });
  }

  try {
    const newTask = await addTask(text);
    res.status(201).json(newTask);
  } catch (e) {
    console.error("タスクの追加エラー:", e);
    res.status(500).json({
      message: "タスクの追加中にエラーが発生しました。",
      error: e.message,
    });
  }
});

/**
 * 取得（READ）
 * @param {string} text
 * @returns {Promise<object>}
 */
router.get("/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      message: "無効なIDです。整数でしてください",
    });
  }

  try {
    const task = await getTask(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({
        message: "タスクが見つかりません。",
      });
    }
  } catch (e) {
    console.error(`タスクID ${id} の取得エラー:`, e);
    res.status(500).json({
      message: "タスクの取得中にエラーが発生しました。",
      error: e.message,
    });
  }
});

/**
 * 全件取得（READ）
 * @param {string} text
 * @returns {Promise<object>}
 */
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error("タスクの取得エラー:", error);
    res.status(500).json({
      message: "タスクの取得中にエラーが発生しました。",
      error: error.message,
    });
  }
});

/**
 * 更新（UPDATE
 * @param {string} text
 * @returns {Promise<object>}
 */
router.put("/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      message: "無効なタスクIDです。",
    });
  }

  const updates = req.body;
  // 更新可能なフィールドをチェック (例: text, is_completed)
  const allowedUpdates = ["text", "is_completed"];
  const invalidUpdates = Object.keys(updates).filter(
    (key) => !allowedUpdates.includes(key)
  );

  if (invalidUpdates.length > 0) {
    return res.status(400).json({
      message: `無効な更新フィールドが含まれています: ${invalidUpdates.join(
        ", "
      )}`,
    });
  }

  // is_completed が存在する場合、boolean型であることを確認
  if (
    updates.is_completed !== undefined &&
    typeof updates.is_completed !== "boolean"
  ) {
    return res.status(400).json({
      message: "is_completedはboolean型である必要があります。",
    });
  }

  try {
    const success = await updateTask(id, updates);
    if (success) {
      // 更新後のタスクを返却することも可能だが、ここでは成功のみを通知
      res.json({
        message: "タスクが正常に更新されました。",
      });
    } else {
      res.status(404).json({
        message: "タスクが見つからないか、更新に失敗しました。",
      });
    }
  } catch (error) {
    console.error(`タスクID ${id} の更新エラー:`, error);
    res.status(500).json({
      message: "タスクの更新中にエラーが発生しました。",
      error: error.message,
    });
  }
});

/**
 * 削除（DELETE）
 * @param {string} text
 * @returns {Promise<object>}
 */
router.delete("/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      message: "無効なタスクIDです。",
    });
  }

  try {
    const success = await deleteTask(id);
    if (success) {
      res.json({
        message: "タスクが正常に削除されました。",
      });
    } else {
      res.status(404).json({
        message: "タスクが見つからないか、削除に失敗しました。",
      });
    }
  } catch (error) {
    console.error(`タスクID ${id} の削除エラー:`, error);
    res.status(500).json({
      message: "タスクの削除中にエラーが発生しました。",
      error: error.message,
    });
  }
});

export default router;
