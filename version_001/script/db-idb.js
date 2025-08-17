// db-idb.js

import { openDB } from "https://cdn.jsdelivr.net/npm/idb@8/+esm";
import { DB_NAME, STORE_NAME, DB_VERSION } from "./constants.js";

let db;

async function initDB({ onSuccess, onError = null }) {
  try {
    db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    });
    await onSuccess();
  } catch (e) {
    console.error("DB init error", e);
    onError ? onError(e) : alert("IndexedDB の初期化に失敗しました。");
  }
}

// CREATE
async function addTask(text) {
  const task = {
    text,
    created_at: new Date().toISOString(),
    updated_at: null,
    is_completed: false,
  };

  return await db.add(STORE_NAME, task);
}

// READ
async function getTask(id) {
  return await db.get(STORE_NAME, id);
}

async function getAllTasks() {
  return await db.getAll(STORE_NAME);
}

// UPDATE
async function updateTask(id, updates = {}) {
  const task = await db.get(STORE_NAME, id);
  if (!task) return;

  if (updates.text !== undefined) task.text = updates.text;
  if (updates.is_completed !== undefined)
    task.is_completed = updates.is_completed;

  task.updated_at = new Date().toISOString();

  try {
    await db.put(STORE_NAME, task);
    return true;
  } catch (e) {
    return false;
  }
}

// DELETE
async function deleteTask(id) {
  try {
    await db.delete(STORE_NAME, id);
    return true;
  } catch (e) {
    return false;
  }
}

export { initDB, addTask, getTask, getAllTasks, updateTask, deleteTask };
