// ./src/model/taskModel.js

import prisma from "../utils/prisma.js";
import { DatabaseError } from "../utils/errors.js";

/**
 * 新規作成:[POST method]
 * @param {string} text
 * @returns {Promise<{id: number}>}
 * @throws {DatabaseError}
 */
async function addTask(text) {
  try {
    const task = await prisma.task.create({
      data: { text },
    });
    return { id: task.id };
  } catch (err) {
    if (err.name?.startsWith("PrismaClient")) {
      throw new DatabaseError("タスクの新規作成に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベース操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

/**
 * 一件取得:[GET method]
 * @param {number} id
 * @returns {Promise<Task>}
 * @throws {DatabaseError}
 */
async function getTask(id) {
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return null;
    return task;
  } catch (err) {
    if (err.name?.startsWith("PrismaClient")) {
      throw new DatabaseError("タスクの取得に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベース操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

/**
 * 全件取得:[GET method]
 * @returns {Promise<Array<Task>>}
 * @throws {DatabaseError}
 */
async function getAllTasks() {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;
  } catch (err) {
    if (err.name?.startsWith("PrismaClient")) {
      throw new DatabaseError("タスクの全件取得に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベース操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

/**
 * 更新:[PUT method]
 * @param {number} id
 * @param {object} updates
 * @returns {Promise<boolean>}
 * @throws {DatabaseError}
 */
async function updateTask(id, updates) {
  try {
    const result = await prisma.task.update({
      where: { id },
      data: {
        ...updates,
        updatedAt: new Date(),
      },
    });
    return Boolean(result);
  } catch (err) {
    if (err.name?.startsWith("PrismaClient")) {
      throw new DatabaseError("タスクの更新に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベース操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

/**
 * 削除:[DELETE method]
 * @param {number} id
 * @returns {Promise<boolean>}
 * @throws {DatabaseError}
 */
async function deleteTask(id) {
  try {
    const result = await prisma.task.delete({ where: { id } });
    return Boolean(result);
  } catch (err) {
    if (err.name?.startsWith("PrismaClient")) {
      throw new DatabaseError("タスクの削除に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベース操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

export { addTask, getTask, getAllTasks, updateTask, deleteTask };
