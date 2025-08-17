// ./src/router/tasksRouter.js

import express from "express";
import {
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../model/taskModel.js";
import { AppError, NotFoundError, BadRequestError } from "../utils/errors.js";

const router = express.Router();

// 疎通確認
router.head("/tasks", async (_, res) => {
  try {
    await getAllTasks();
    res.status(200).end();
  } catch (err) {
    throw new AppError(`通信に失敗しました。`);
  }
});

// CREATE:[新規作成]
router.post("/tasks", async (req, res, next) => {
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim() === "") {
    throw new BadRequestError("テキストの入力は必須です。");
  }

  try {
    const newTask = await addTask(text);
    res.status(201).json(newTask);
  } catch (err) {
    return next(err);
  }
});

// READ:[取得]
router.get("/tasks/:id", async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id) || id <= 0) {
    throw new BadRequestError(
      `ID:${req.params.id} は無効な値です。正の整数で指定してください。`
    );
  }

  try {
    const task = await getTask(id);
    res.status(200).json(task);
  } catch (err) {
    return next(err);
  }
});

// READ:[全件取得]
router.get("/tasks", async (_, res, next) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    return next(err);
  }
});

// UPDATE:[更新]
router.put("/tasks/:id", async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    throw new BadRequestError(
      `ID:${id}は、無効な値です。正の整数で指定してください。`
    );
  }

  const updates = req.body;
  const allowedUpdates = ["text", "isCompleted"];
  const invalidUpdates = Object.keys(updates).filter(
    (key) => !allowedUpdates.includes(key)
  );

  if (invalidUpdates.length > 0) {
    throw new BadRequestError(
      `無効な更新フィールドが含まれています: ${invalidUpdates.join(", ")}`
    );
  }

  if (
    updates.isCompleted !== undefined &&
    typeof updates.isCompleted !== "boolean"
  ) {
    throw new BadRequestError("isCompleted は、Booleanで指定して下さい。");
  }

  try {
    const success = await updateTask(id, updates);
    if (success) {
      res.status(204).end();
    } else {
      throw new NotFoundError(`ID:${id} が見つかりません。`);
    }
  } catch (err) {
    return next(err);
  }
});

// DELETE:[削除]
router.delete("/tasks/:id", async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    throw new BadRequestError(
      `ID:${id} は無効な値です。正の整数で指定してください。`
    );
  }

  try {
    const success = await deleteTask(id);
    if (success) {
      res.status(204).end();
    } else {
      throw new NotFoundError(`ID:${id} が見つかりません。`);
    }
  } catch (err) {
    return next(err);
  }
});

export default router;
