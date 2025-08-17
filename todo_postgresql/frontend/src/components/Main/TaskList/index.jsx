import Task from "./Task";
import { useTasksContext } from "../TasksContext";
import styles from "./TaskList.module.css";

export default function TaskList() {
  const { tasks } = useTasksContext();
  return (
    <ul aria-busy="true" className={styles["task-list"]}>
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </ul>
  );
}
