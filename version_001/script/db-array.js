// db.js

let db;
let nextId;

async function initDB({ onSuccess, onError = null }) {
  try {
    db = [];
    nextId = 1;
    await onSuccess();
  } catch (e) {
    console.error("DB init error", e);
    onError ? onError(e) : alert("DB(Array)の初期化に失敗しました。");
  }
}

// CREATE
async function addTask(text) {
  const data = {
    id: nextId++,
    text,
    created_at: new Date().toISOString(),
    updated_at: null,
    is_completed: false,
  };
  db.push(data);
  return data.id;
}

// READ
async function getTask(id) {
  const task = db.find((task) => task.id === id);
  return task;
}

async function getAllTasks() {
  const tasks = db.map((task) => ({ ...task }));
  return tasks;
}

// UPDATE
async function updateTask(id, updates = {}) {
  const task = db.find((task) => task.id === id);
  if (!task) return false;

  if (updates.text !== undefined) task.text = updates.text;
  if (updates.is_completed !== undefined)
    task.is_completed = updates.is_completed;

  task.updated_at = new Date().toISOString();
  return true;
}

// DELETE
async function deleteTask(id) {
  const index = db.findIndex((task) => task.id === id);
  if (index !== -1) {
    db.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

export { initDB, addTask, getTask, getAllTasks, updateTask, deleteTask };
