// db.js

import { openDB } from "https://cdn.jsdelivr.net/npm/idb@8/+esm";
import { DB_NAME, STORE_NAME, DB_VERSION } from "./constants.js";

let db;

async function initDB() {
  if (db) {
    return;
  }

  try {
    let isInitialized = false;

    db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
          isInitialized = true;
        }
      },
    });

    if (isInitialized) {
      console.log(`IndexedDB: ${db.name} が初期化されました 🎉`);
    } else {
      console.log(`IndexedDB: ${db.name} に接続しました 🎉`);
    }
  } catch (e) {
    console.error(`IndexedDB : ${db.name} の接続に失敗しました 🔥`, e);
    onError ? onError(e) : alert("IndexedDB の接続に失敗しました。");
  }
}

/**
 * 追加（CREATE）
 * @param {string} text
 * @returns {Promise<object>}
 */
async function addTask(text) {
  const task = {
    text,
    created_at: new Date().toISOString(),
    updated_at: null,
    is_completed: false,
  };

  return await db.add(STORE_NAME, task);
}

/**
 * 取得（READ）
 * @param {number} id
 * @returns {Promise<object|undefined>}
 */
async function getTask(id) {
  return await db.get(STORE_NAME, id);
}

/**
 * 全件取得（READ）
 * @returns {Promise<Array<object>>}
 */
async function getAllTasks() {
  return await db.getAll(STORE_NAME);
}

/**
 * 更新（UPDATE）
 * @param {number} id
 * @param {object} updates
 * @returns {Promise<boolean>}
 */
async function updateTask(id, updates = {}) {
  try {
    const task = await db.get(STORE_NAME, id);
    if (!task) return;

    if (updates.text !== undefined) task.text = updates.text;
    if (updates.is_completed !== undefined)
      task.is_completed = updates.is_completed;

    task.updated_at = new Date().toISOString();

    await db.put(STORE_NAME, task);
    return true;
  } catch (e) {
    console.error(`id:${id} の更新に失敗しました:`, e);
    return false;
  }
}

/**
 * 削除（DELETE）
 * @param {number} id
 * @returns {Promise<boolean>}
 */
async function deleteTask(id) {
  try {
    await db.delete(STORE_NAME, id);
    return true;
  } catch (e) {
    console.error(`id:${id} の削除に失敗しました:`, e);
    return false;
  }
}

export { initDB, addTask, getTask, getAllTasks, updateTask, deleteTask };
