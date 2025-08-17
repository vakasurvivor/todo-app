import TaskEditBtn from "./TaskEditBtn";
import TaskDeleteBtn from "./TaskDeleteBtn";
import styles from "./TaskControlBtns.module.css";

export default function TaskControlBtns({ task }) {
  return (
    <div
      className={styles["task-control-btns"]}
      role="group"
      aria-label="タスクを操作する"
    >
      <TaskEditBtn
        id={task.id}
        className={styles["task-edit-button"]}
        originalText={task.text}
      />
      <TaskDeleteBtn id={task.id} className={styles["task-delete-button"]} />
    </div>
  );
}
