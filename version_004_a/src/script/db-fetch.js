// db-feach.js

const API_BASE_URL = "http://localhost:8080/api/tasks";
/**
 * @param {Response}
 * @returns {Promise<object>}
 */
async function handleResponse(res) {
  if (!res.ok) {
    const errorData = await res.json();
    // APIからの具体的なエラーメッセージを投げる
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

async function connectDB() {
  try {
    const res = await fetch(API_BASE_URL, { method: "HEAD" }); // 軽量に疎通確認
    if (res.ok) {
      console.log("[Node.js: Express] への接続に成功しました 🎉");
    } else {
      console.error(
        `[Node.js: Express] への接続に失敗しました 🔥 status: ${res.status}`
      );
    }
  } catch (e) {
    console.error("APIサーバーへの接続中にエラーが発生しました 🔥", e);
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
  } catch (error) {
    console.error("タスクの追加に失敗しました:", error);
    throw error; // エラーを呼び出し元に再スロー
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
  } catch (error) {
    console.error(`タスクID ${id} の取得に失敗しました:`, error);
    throw error;
  }
}

/**
 * 全件取得（READ）
 * @returns {Promise<Array<object>>}
 */
async function fetchGetAllTasks() {
  try {
    const res = await fetch(API_BASE_URL);
    return await handleResponse(res);
  } catch (error) {
    console.error("全タスクの取得に失敗しました:", error);
    throw error;
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
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    // APIは成功時にメッセージを返すため、ここではtrueを返す
    await handleResponse(response); // レスポンスを処理し、エラーがあればここでスローされる
    return true;
  } catch (error) {
    console.error(`タスクID ${id} の更新に失敗しました:`, error);
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
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    // APIは成功時にメッセージを返すため、ここではtrueを返す
    await handleResponse(response); // レスポンスを処理し、エラーがあればここでスローされる
    return true;
  } catch (error) {
    console.error(`タスクID ${id} の削除に失敗しました:`, error);
    return false; // 削除失敗
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
