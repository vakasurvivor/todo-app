// --- ./db/db.js ---

import pkg from "pg";
const { Pool } = pkg;

let pool;

/**
 * @returns {Promise<void>}
 */
async function initDB() {
  if (pool) {
    return;
  }

  const dbConfig = {
    user: process.env.DB_USER || "your_user",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "your_database",
    password: process.env.DB_PASSWORD || "your_password",
    port: process.env.DB_PORT || 5432,
  };

  try {
    pool = new Pool(dbConfig);
    const client = await pool.connect();

    // PostgreSQLのSERIAL型は、INTEGER PRIMARY KEY AUTOINCREMENTと同等
    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE,
        is_completed BOOLEAN DEFAULT FALSE
      );
    `);

    // テーブルが存在するかどうかの確認は不要。CREATE TABLE IF NOT EXISTS が同様の働きをするため。
    console.log(`🎉 PostgreSQLに接続されました \n`);
    client.release();
  } catch (e) {
    console.error(`🔥 PostgreSQLへの接続に失敗しました \n`, e);
    throw new Error(`🔥 PostgreSQLへの接続に失敗しました`);
  }
}

/**
 * @param {string} text
 * @returns {Promise<object>}
 */
async function addTask(text) {
  const query = `
    INSERT INTO tasks (text, created_at, is_completed)
    VALUES ($1, $2, $3)
    RETURNING id;
  `;
  const values = [text, new Date().toISOString(), false];

  try {
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      throw new Error("タスクの追加に失敗しました。");
    }
    return { id: result.rows[0].id };
  } catch (e) {
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
  const query = `
    SELECT id, text, created_at, updated_at, is_completed
    FROM tasks
    WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);

  const task = result.rows[0];

  if (!task) {
    throw new Error(`タスクが見つかりません: ID ${id}`);
  }

  return task;
}

/**
 * @returns {Promise<Array<object>>}
 */
async function getAllTasks() {
  const query = `
    SELECT id, text, created_at, updated_at, is_completed
    FROM tasks;
  `;
  const result = await pool.query(query);
  return result.rows;
}

/**
 * @param {number} id
 * @param {object} updates
 * @returns {Promise<boolean>}
 */
async function updateTask(id, updates = {}) {
  try {
    const fields = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = Object.values(updates);

    if (values.length === 0) {
      return false; // 更新するデータがない場合は何もしない
    }

    const query = `
      UPDATE tasks
      SET ${fields}, updated_at = NOW()
      WHERE id = $${values.length + 1};
    `;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rowCount > 0;
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
    const query = `DELETE FROM tasks WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  } catch (e) {
    console.error(`id:${id} の削除に失敗しました:`, e);
    return false;
  }
}

export { initDB, addTask, getTask, getAllTasks, updateTask, deleteTask };
