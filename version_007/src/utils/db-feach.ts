// db-feach.js

const API_BASE_URL = "/api/tasks";

// 追加（CREATE）
async function fetchAddTask(text: string) {
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

// 取得（READ）
async function fetchGetTask(id: number) {
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

// 全件取得（READ）
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

// 更新（UPDATE）
async function fetchUpdateTask(id: number, updates = {}) {
  try {
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

    return true;
  } catch (err) {
    throw err;
  }
}

// 削除（DELETE）
async function fetchDeleteTask(id: number) {
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
  fetchAddTask,
  fetchGetTask,
  fetchGetAllTasks,
  fetchUpdateTask,
  fetchDeleteTask,
};
