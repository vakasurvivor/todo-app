// dom-idb.js

import {
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "./db-array.js";

export async function renderTaskList() {
  const taskListEl = document.querySelector(".task-list");
  taskListEl.replaceChildren(); // <ul> 要素を初期化

  const tasks = await getAllTasks(); // 全件取得

  for (const task of tasks) {
    const taskEl = createTaskEl(task);
    taskListEl.append(taskEl); // <li> 要素を追加
  }
}

export function attachTaskListEvents() {
  const taskInputFormEl = document.querySelector(".task-input-area");
  taskInputFormEl.addEventListener("submit", handleAddTaskFormSubmit);

  const taskListEl = document.querySelector(".task-list");
  taskListEl.addEventListener("click", handleTaskListClick);
  taskListEl.addEventListener("change", handleTaskListChange);
}

async function handleAddTaskFormSubmit(e) {
  e.preventDefault();
  const { currentTarget } = e;

  const inputEl = document.getElementById("task-input");
  const text = inputEl.value.trim();
  if (!text) return;

  const id = await addTask(text); // 追加
  const task = await getTask(id); // 取得

  const taskListEl = document.querySelector(".task-list");
  const taskEl = createTaskEl(task);
  taskListEl.append(taskEl); // <li> 要素を追加

  currentTarget.reset();
}

async function handleTaskListClick(e) {
  const editBtnEl = e.target.closest(".task-edit-button");
  if (editBtnEl) {
    await handleEditBtnClick(editBtnEl);
    return;
  }

  const deleteBtnEl = e.target.closest(".task-delete-button");
  if (deleteBtnEl) {
    await handleDeleteBtnClick(deleteBtnEl);
    return;
  }

  async function handleEditBtnClick(btnEl) {
    const taskEl = btnEl.closest("li");
    const id = Number(taskEl?.dataset.taskItemId);
    if (isNaN(id) || taskEl.querySelector("input.task-text")) return;

    const oldTextEl = taskEl.querySelector("span.task-text");
    const oldText = oldTextEl.textContent;

    const inputTextEl = Object.assign(document.createElement("input"), {
      className: "task-text",
      type: "text",
      maxLength: "50",
      ariaLabel: "タスクを変更する",
      value: oldText,
    });

    const oldTextCloneEl = oldTextEl.cloneNode(true);
    oldTextEl.replaceWith(inputTextEl);
    inputTextEl.focus();

    async function finishEdit() {
      const newText = inputTextEl.value.trim();

      if (newText && newText !== oldText) {
        // indexedDB 更新
        const res = await updateTask(id, { text: newText });

        if (res) {
          const newTextEl = Object.assign(document.createElement("span"), {
            className: "task-text",
            textContent: newText,
          });
          inputTextEl.replaceWith(newTextEl);
        }
      } else {
        inputTextEl.replaceWith(oldTextCloneEl);
      }
    }

    inputTextEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") finishEdit();
      if (e.key === "Escape") inputTextEl.replaceWith(oldTextCloneEl);
    });

    inputTextEl.addEventListener("blur", finishEdit);
  }

  async function handleDeleteBtnClick(btnEl) {
    const response = window.confirm("削除しますか？");

    if (response) {
      const taskEl = btnEl.closest("li");
      const id = Number(taskEl?.dataset.taskItemId);
      if (isNaN(id)) return;

      const res = await deleteTask(id); // 削除
      if (res) {
        taskEl.remove();
      }
    }
  }
}

async function handleTaskListChange(e) {
  if (e.target.matches("input.task-completed")) {
    const taskEl = e.target.closest("li");
    const id = Number(taskEl?.dataset.taskItemId);
    if (isNaN(id)) return;

    const isCompleted = e.target.checked;

    const res = await updateTask(id, { is_completed: isCompleted }); // 更新
    if (res) {
    }
  }
}

function createTaskEl(task) {
  const taskEl = Object.assign(document.createElement("li"), {
    className: "task-item",
  });
  taskEl.dataset.taskItemId = task.id;

  const checkboxEl = (() => {
    const labelEl = Object.assign(document.createElement("label"), {
      className: "task-checkbox",
    });

    const inputEl = Object.assign(document.createElement("input"), {
      className: "task-completed",
      type: "checkbox",
      checked: task.is_completed,
    });

    labelEl.append(inputEl);
    return labelEl;
  })();

  const textEl = Object.assign(document.createElement("span"), {
    className: "task-text",
    textContent: task.text,
  });

  const buttonsEl = (() => {
    const wrapperDivEl = Object.assign(document.createElement("div"), {
      className: "button-wrapper",
    });

    const editBtnEl = Object.assign(document.createElement("button"), {
      className: "task-edit-button",
      type: "button",
    });

    const editImgEl = Object.assign(document.createElement("img"), {
      className: "edit-icon",
      src: "/img/pen.svg",
      width: "24",
      height: "24",
      alt: "Edit Icon",
    });

    editBtnEl.append(editImgEl);

    const deleteBtnEl = Object.assign(document.createElement("button"), {
      className: "task-delete-button",
      type: "button",
    });

    const deleteImgEl = Object.assign(document.createElement("img"), {
      className: "delete-icon",
      src: "/img/trash.svg",
      width: "24",
      height: "24",
      alt: "Delete Icon",
    });

    deleteBtnEl.append(deleteImgEl);
    wrapperDivEl.append(editBtnEl, deleteBtnEl);

    return wrapperDivEl;
  })();

  taskEl.append(checkboxEl, textEl, buttonsEl);
  return taskEl;
}
