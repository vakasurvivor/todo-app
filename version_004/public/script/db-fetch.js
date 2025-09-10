// db-feach.js

const API_BASE_URL = "/api/tasks";

/**
 * @param {Response}
 * @returns {Promise<object>}
 */
async function handleResponse(res) {
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }

  return res.json();
}

async function connectDB() {
  try {
    const res = await fetch(API_BASE_URL, { method: "HEAD" });

    if (res.ok) {
      console.log("[Node.js: Express] への接続に成功しました 🎉");
    } else {
      console.error(
        `[Node.js: Express] への接続に失敗しました 🔥 status: ${res.status}`
      );
    }
  } catch (err) {
    console.error("APIサーバーへの接続中にエラーが発生しました 🔥", err);
  }
}

/**
 * 追加（CREATE）
 * @param {string} text
 * @returns {Promise<object>}
 */
async function fetchAddTask(text) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    return await handleResponse(response);
  } catch (err) {
    console.error("タスクの追加に失敗しました:", err);
    throw err; // エラーを呼び出し元に再スロー
  }
}

/**
 * 取得（READ）
 * @param {number} id
 * @returns {Promise<object|undefined>}
 */
async function fetchGetTask(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    if (res.status === 404) {
      return undefined;
    }
    return await handleResponse(res);
  } catch (err) {
    console.error(`タスクID ${id} の取得に失敗しました:`, err);
    throw err;
  }
}

/**
 * 全件取得（READ）
 * @returns {Promise<Array<object>>}
 */
async function fetchGetAllTasks() {
  try {
    const res = await fetch(API_BASE_URL);
    console.log(res);
    return await handleResponse(res);
  } catch (err) {
    console.error("全タスクの取得に失敗しました:", err);
    throw err;
  }
}

/**
 * 更新（UPDATE）
 * @param {number} id
 * @param {object} updates
 * @returns {Promise<boolean>}
 */
async function fetchUpdateTask(id, updates = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      return true;
    }
  } catch (err) {
    console.error(`タスクID ${id} の更新に失敗しました:`, err);
    return false; // 更新失敗
  }
}

/**
 * 削除（DELETE）
 * @param {number} id
 * @returns {Promise<boolean>}
 */
async function fetchDeleteTask(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      return true;
    }
  } catch (err) {
    console.error(`ID:${id} の削除に失敗しました。:`, err);
    return false;
  }
}

export {
  connectDB,
  fetchAddTask,
  fetchGetTask,
  fetchGetAllTasks,
  fetchUpdateTask,
  fetchDeleteTask,
};
