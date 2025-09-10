// db-feach.js

const API_BASE_URL = "/api/tasks";

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
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error(errorData);
      throw new Error(errorData.message || `HTTP Error Status: ${res.status}`);
    }

    return res.json();
  } catch (err) {
    throw err;
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

    if (!res.ok) {
      const errorData = await res.json();
      console.error(errorData);
      throw new Error(errorData.message || `HTTP Error Status: ${res.status}`);
    }

    return res.json();
  } catch (err) {
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

    if (!res.ok) {
      const errorData = await res.json();
      console.error(errorData);
      throw new Error(errorData.message || `HTTP Error Status: ${res.status}`);
    }

    return res.json();
  } catch (err) {
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
    console.log(updates);
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error(errorData);
      throw new Error(errorData.message || `HTTP Error Status: ${res.status}`);
    }

    console.log("成功");
    return true;
  } catch (err) {
    throw err;
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

    if (!res.ok) {
      const errorData = await res.json();
      console.error(errorData);
      throw new Error(errorData.message || `HTTP Error Status: ${res.status}`);
    }

    return true;
  } catch (err) {
    throw err;
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
