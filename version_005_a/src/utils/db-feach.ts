// db-feach.js

const API_BASE_URL = "http://localhost:3000/api/tasks";

/**
 * @param {Response}
 * @returns {Promise<object>}
 */
async function handleResponse(res: any) {
  if (!res.ok) {
    const errorData = await res.json();
    // APIからの具体的なエラーメッセージを投げる
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

/**
 * 追加（CREATE）
 */
async function fetchAddTask(text: string): Promise<object> {
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
 */
async function fetchGetTask(id: number) {
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
 */
async function fetchGetAllTasks(): Promise<Array<object>> {
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
 */
async function fetchUpdateTask(id: number, updates = {}): Promise<boolean> {
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
  } catch (error) {
    console.error(`タスクID ${id} の更新に失敗しました:`, error);
    return false; // 更新失敗
  }
}

/**
 * 削除（DELETE）
 */
async function fetchDeleteTask(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.error(`タスクID ${id} の削除に失敗しました:`, error);
    return false;
  }
}

export {
  fetchAddTask,
  fetchGetTask,
  fetchGetAllTasks,
  fetchUpdateTask,
  fetchDeleteTask,
};
