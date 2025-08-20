// ./src/model/taskModel.js

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { DatabaseError } from "../utils/errors.js";
import snakeToCamel from "../utils/snakeToCamel.js";

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} text
 * @property {string} createdAt
 * @property {string | null} updatedAt
 * @property {boolean} isCompleted
 */

let db;

/**
 * SQLite 初期化
 * @returns {Promise<void>}
 * @throws {DatabaseError}
 */
async function initDB() {
  if (db) {
    return;
  }

  let tableNameForLog = `${process.env.DB_TYPE || "SQLite"} (${
    process.env.DB_TABLE_NAME || "tasks"
  }.db)`;

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
      console.log(`🚀 ${tableNameForLog} が初期化されました。\n`);
    } else {
      console.log(`🤝 ${tableNameForLog} に接続されました。\n`);
    }

    return db;
  } catch (err) {
    if (!db) {
      throw new DatabaseError(`${tableNameForLog} の接続に失敗しました。`, {
        cause: err,
      });
    }
    throw new DatabaseError(`${tableNameForLog} の初期化に失敗しました。`, {
      cause: err,
    });
  }
}

/**
 * 新規作成:[POST method]
 * @param {string} text
 * @returns {Promise<{id: number}>}
 * @throws {DatabaseError}
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

    return { id: result.lastID };
  } catch (err) {
    if (err.code && err.code.startsWith("SQLITE")) {
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
    const task = await db.get(`SELECT * FROM tasks WHERE id = ?`, id);
    if (!task) return null;

    const camelTask = snakeToCamel(task);
    return {
      ...camelTask,
      isCompleted: Boolean(camelTask.isCompleted), // Boolean に変換
    };
  } catch (err) {
    if (err.code && err.code.startsWith("SQLITE")) {
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
    const tasks = await db.all(`SELECT * FROM tasks`);

    return tasks.map((task) => {
      const camelTask = snakeToCamel(task);
      return {
        ...camelTask,
        isCompleted: Boolean(camelTask.isCompleted), // Boolean に変換
      };
    });
  } catch (err) {
    if (err.code && err.code.startsWith("SQLITE")) {
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
 * PUT method : [更新]
 * @param {number} id
 * @param {object} updates
 * @returns {Promise<boolean>}
 * @throws {DatabaseError}
 */
async function updateTask(id, updates) {
  try {
    const task = await getTask(id);

    const updatedTask = {
      ...task,
      ...updates,
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
    if (err.code && err.code.startsWith("SQLITE")) {
      throw new DatabaseError("タスクの更新に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベースの操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

/**
 * DELETE method : [削除]
 * @param {number} id
 * @returns {Promise<boolean>}
 * @throws {DatabaseError}
 */
async function deleteTask(id) {
  try {
    const result = await db.run(`DELETE FROM tasks WHERE id = ?`, id);
    return result.changes > 0;
  } catch (err) {
    if (err.code && err.code.startsWith("SQLITE")) {
      throw new DatabaseError("タスクの削除に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベースの操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

export { initDB, addTask, getTask, getAllTasks, updateTask, deleteTask };
