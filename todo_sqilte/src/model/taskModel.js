// ./src/model/taskModel.js

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { AppError, DatabaseError, NotFoundError } from "../utils/errors.js";
import snakeToCamel from "../utils/snakeToCamel.js";

let db;

/**
 * @returns {Promise<void>}
 * @throws {Error}
 */
async function initDB() {
  if (db) {
    return;
  }

  let tableNameForLog = `[${process.env.DB_TYPE || "SQLite"} 📑:${
    process.env.DB_TABLE_NAME || "tasks"
  }]`;

  try {
    db = await open({
      filename: process.env.DB_FILE_PATH,
      driver: sqlite3.Database,
    });

    const tableExists = Boolean(
      await db.get(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='tasks'`
      )
    );

    await db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT,
        is_completed INTEGER DEFAULT 0
      );
    `);

    if (!tableExists) {
      console.log(`🎉 ${tableNameForLog} が初期化されました \n`);
    } else {
      console.log(`🎉 ${tableNameForLog} に接続されました \n`);
    }

    return db;
  } catch (err) {
    if (!db) {
      console.error(`🔥 ${tableNameForLog} の接続に失敗しました \n`, err);
      throw new DatabaseError(`🔥 ${tableNameForLog} の接続に失敗しました`);
    }

    console.error(`🔥 ${tableNameForLog} の初期化に失敗しました \n`, err);
    throw new AppError(`🔥 ${tableNameForLog} の初期化に失敗しました`);
  }
}

/**
 * 新規作成 : [POST method]
 * @param {string} text
 * @returns {Promise<{id: number}>}
 * @throws {Error}
 */
async function addTask(text) {
  const task = {
    text,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    isCompleted: 0, // SQLiteでは、真偽値を二進数で表現する
  };

  try {
    const sql = `INSERT INTO tasks (text, created_at, updated_at, is_completed) VALUES (?, ?, ?, ?)`;
    const result = await db.run(
      sql,
      task.text,
      task.createdAt,
      task.updatedAt,
      task.isCompleted
    );

    if (result.changes === 0) {
      throw new AppError("新規作成に失敗しました。");
    }

    return { id: result.lastID };
  } catch (err) {
    console.error("新規作成中に例外が発生しました。:", err);
    throw err;
  }
}

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} text
 * @property {string} createdAt
 * @property {string | null} updatedAt
 * @property {boolean} isCompleted
 */

/**
 * GET method : [取得]
 * @param {number} id
 * @returns {Promise<Task>}
 * @throws {Error}
 */
async function getTask(id) {
  try {
    const task = await db.get(`SELECT * FROM tasks WHERE id = ?`, id);
    if (!task) throw new NotFoundError(`ID:${id} が見つかりません。`);

    const camelTask = snakeToCamel(task);
    return {
      ...camelTask,
      isCompleted: Boolean(task.is_completed), // Boolean に変換
    };
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    console.error(`ID:${id} の取得中に例外が発生しました。:`, err);
    throw new AppError(`ID:${id} の取得に失敗しました。`);
  }
}

/**
 * GET method : [全件取得]
 * @returns {Promise<Array<Task>>}
 * @throws {Error}
 */
async function getAllTasks() {
  try {
    const tasks = await db.all(`SELECT * FROM tasks`);

    return tasks.map((task) => {
      const camelTask = snakeToCamel(task);
      return {
        ...camelTask,
        isCompleted: Boolean(task.is_completed), // Boolean に変換
      };
    });
  } catch (err) {
    console.error("全件取得中に例外が発生しました。:", err);
    throw new AppError("全件取得中に失敗しました。");
  }
}

/**
 * PUT method : [更新]
 * @param {number} id
 * @param {object} updates
 * @returns {Promise<boolean>}
 * @throws {Error}
 */
async function updateTask(id, updates = {}) {
  try {
    const task = await getTask(id);

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    const updatedTask = {
      ...task,
      ...filteredUpdates,
      updatedAt: new Date().toISOString(),
    };

    const sql = `UPDATE tasks SET text = ?, updated_at = ?, is_completed = ? WHERE id = ?`;
    const result = await db.run(
      sql,
      updatedTask.text,
      updatedTask.updatedAt,
      updatedTask.isCompleted ? 1 : 0, // Boolean を二進数に変換
      id
    );

    return result.changes > 0;
  } catch (err) {
    console.error(`ID:${id} の更新に失敗しました。:`, err);
    throw new Error(`ID:${id} の更新に失敗しました。`);
  }
}

/**
 * DELETE method : [削除]
 * @param {number} id
 * @returns {Promise<boolean>}
 * @throws {Error}
 */
async function deleteTask(id) {
  try {
    const result = await db.run(`DELETE FROM tasks WHERE id = ?`, id);
    return result.changes > 0;
  } catch (err) {
    console.error(`ID:${id} の削除中に例外が発生しました。:`, err);
    throw new AppError(`ID:${id} の削除に失敗しました。`);
  }
}

export { initDB, addTask, getTask, getAllTasks, updateTask, deleteTask };
