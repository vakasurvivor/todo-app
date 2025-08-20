// ./src/router/tasksRouter.js

import express from "express";
import {
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../model/taskModel.js";
import { AppError, NotFoundError } from "../utils/errors.js";
import zValidate from "../middleware/validationHandler.js";
import { idSchema, taskSchema } from "../utils/schemas.js";

const router = express.Router();

// 疎通確認
router.head("/tasks", async (_, res) => {
  try {
    await getAllTasks();
    res.status(200).end();
  } catch (err) {
    next(
      new AppError(`通信に失敗しました。`, {
        cause: err,
      })
    );
  }
});

// CREATE:[新規作成]
router.post(
  "/tasks",
  zValidate({ body: taskSchema.pick({ text: true }) }),
  async (req, res, next) => {
    try {
      const { text } = req.body;
      const newTask = await addTask(text);
      res.status(201).json(newTask);
    } catch (err) {
      return next(err);
    }
  }
);

// READ:[一件取得]
router.get(
  "/tasks/:id",
  zValidate({ params: idSchema }),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const task = await getTask(id);
      if (!task) throw new NotFoundError(`タスク id:${id} が見つかりません。`);
      res.status(200).json(task);
    } catch (err) {
      return next(err);
    }
  }
);

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
router.put(
  "/tasks/:id",
  zValidate({ params: idSchema, body: taskSchema.partial() }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const success = await updateTask(id, updates);
      if (success) {
        res.status(204).end();
      } else {
        throw new NotFoundError(`タスク id:${id} が見つかりません。`);
      }
    } catch (err) {
      return next(err);
    }
  }
);

// DELETE:[削除]
router.delete(
  "/tasks/:id",
  zValidate({ params: idSchema }),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const success = await deleteTask(id);
      if (success) {
        res.status(204).end();
      } else {
        throw new NotFoundError(`タスク id:${id} が見つかりません。`);
      }
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
