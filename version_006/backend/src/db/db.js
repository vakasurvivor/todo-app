// --- ./src/db/db.js ---

import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

/**
 * @returns {Promise<void>}
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
  } catch (e) {
    if (!db) {
      console.error(`🔥 ${tableNameForLog} の接続に失敗しました \n`, e);
      throw new Error(`🔥 ${tableNameForLog} の接続に失敗しました`);
    }

    console.error(`🔥 ${tableNameForLog} の初期化に失敗しました \n`, e);
    throw new Error(`🔥 ${tableNameForLog} の初期化に失敗しました`);
  }
}

/**
 * @param {string} text
 * @returns {Promise<object>}
 */
async function addTask(text) {
  try {
    const task = {
      text,
      created_at: new Date().toISOString(),
      updated_at: null,
      is_completed: 0, // SQLiteではbooleanを 0/1 で表現する
    };

    const result = await db.run(
      `INSERT INTO tasks (text, created_at, updated_at, is_completed) VALUES (?, ?, ?, ?)`,
      task.text,
      task.created_at,
      task.updated_at,
      task.is_completed
    );

    if (result.changes === 0) {
      throw new Error("タスクの追加に失敗しました。");
    }

    return { id: result.lastID };
  } catch (error) {
    console.error("タスクの追加中にエラーが発生しました:", e);
    throw new Error("タスクの追加に失敗しました。");
  }
}

/**
 *
 * @param {number} id
 * @returns {Promise<object|undefined>}
 */
async function getTask(id) {
  const task = await db.get(`SELECT * FROM tasks WHERE id = ?`, id);

  if (!task) {
    throw new Error(`タスクが見つかりません: ID ${id}`);
  }

  return {
    ...task,
    is_completed: Boolean(task.is_completed), // boolean に変換
  };
}

/**
 * @returns {Promise<Array<object>>}
 */
async function getAllTasks() {
  const tasks = await db.all(`SELECT * FROM tasks`);

  return tasks.map((task) => ({
    ...task,
    is_completed: Boolean(task.is_completed), // boolean に変換
  }));
}

/**
 * @param {number} id
 * @param {object} updates
 * @returns {Promise<boolean>}
 */
async function updateTask(id, updates = {}) {
  try {
    const task = await getTask(id);
    if (!task) return false;

    const updatedTask = { ...task };
    if (updates.text !== undefined) updatedTask.text = updates.text;
    if (updates.is_completed !== undefined)
      updatedTask.is_completed = updates.is_completed;

    updatedTask.updated_at = new Date().toISOString();

    const result = await db.run(
      `UPDATE tasks SET text = ?, updated_at = ?, is_completed = ? WHERE id = ?`,
      updatedTask.text,
      updatedTask.updated_at,
      updatedTask.is_completed ? 1 : 0, // boolean を 0/1 に変換
      id
    );

    return result.changes > 0;
  } catch (e) {
    console.error(`id:${id} の更新に失敗しました:`, e);
    return false;
  }
}

/**
 * DELETE
 * @param {number} id
 * @returns {Promise<boolean>}
 */
async function deleteTask(id) {
  try {
    const result = await db.run(`DELETE FROM tasks WHERE id = ?`, id);
    return result.changes > 0;
  } catch (e) {
    console.error(`id:${id} の削除に失敗しました:`, e);
    return false;
  }
}

export { initDB, addTask, getTask, getAllTasks, updateTask, deleteTask };
