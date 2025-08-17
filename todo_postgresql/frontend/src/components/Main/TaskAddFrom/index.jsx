import { useState, useRef } from "react";
import { useTasksContext } from "@/components/Main/TasksContext";
import { fetchAddTask, fetchGetTask } from "@/api/tasks";
import styles from "./TaskAddFrom.module.css";

export default function TaskAddFrom() {
  const { setTasks } = useTasksContext();
  const [inputText, setInputText] = useState("");
  const inputRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!inputText) {
      inputRef.current.focus();
      return;
    }

    const { id } = await fetchAddTask(inputText);
    const res = await fetchGetTask(id);

    const newTask = {
      ...res,
      isAdding: true,
      isDeleting: false,
      isMovingUp: false,
    };

    if (res) {
      setInputText("");
      setTasks((prev) => [...prev, newTask]);
    }
    return;
  }

  return (
    <form className={styles["task-input-area"]} onSubmit={handleSubmit}>
      {/* <label htmlFor="task-input" className="sr-only">
        新しいタスクを追加する
      </label> */}
      <input
        ref={inputRef}
        id="task-input"
        maxLength="50"
        placeholder="🚀 新しいタスクを追加する"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit" aria-label="タスクを追加する">
        <img height="24" width="24" src="img/plus.svg" />
      </button>
    </form>
  );
}
