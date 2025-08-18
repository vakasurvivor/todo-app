// ./src/model/taskModel.js

import prisma from "../utils/prisma.js";
import { AppError, NotFoundError } from "../utils/errors.js";

/**
 * 新規作成 : [POST method]
 * @param {string} text
 * @returns {Promise<{id: number}>}
 */
async function addTask(text) {
  try {
    const task = await prisma.task.create({
      data: { text },
    });
    return { id: task.id };
  } catch (err) {
    console.error("新規作成中に例外が発生しました:", err);
    throw new AppError("新規作成に失敗しました");
  }
}

/**
 * GET method : [単件取得]
 * @param {number} id
 * @returns {Promise<Task>}
 */
async function getTask(id) {
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundError(`ID:${id} が見つかりません。`);
    return task;
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.error(`ID:${id} の取得中に例外が発生しました:`, err);
    throw new AppError(`ID:${id} の取得に失敗しました`);
  }
}

/**
 * GET method : [全件取得]
 * @returns {Promise<Array<Task>>}
 */
async function getAllTasks() {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;
  } catch (err) {
    console.error("全件取得中に例外が発生しました:", err);
    throw new AppError("全件取得に失敗しました");
  }
}

/**
 * PUT method : [更新]
 * @param {number} id
 * @param {object} updates
 * @returns {Promise<boolean>}
 */
async function updateTask(id, updates = {}) {
  try {
    const task = await prisma.task.update({
      where: { id },
      data: {
        ...updates,
        updatedAt: new Date(), // 自動更新
      },
    });
    return Boolean(task);
  } catch (err) {
    console.error(`ID:${id} の更新に失敗しました:`, err);
    throw new AppError(`ID:${id} の更新に失敗しました`);
  }
}

/**
 * DELETE method : [削除]
 * @param {number} id
 * @returns {Promise<boolean>}
 */
async function deleteTask(id) {
  try {
    await prisma.task.delete({ where: { id } });
    return true;
  } catch (err) {
    console.error(`ID:${id} の削除中に例外が発生しました:`, err);
    throw new AppError(`ID:${id} の削除に失敗しました`);
  }
}

export { addTask, getTask, getAllTasks, updateTask, deleteTask };
