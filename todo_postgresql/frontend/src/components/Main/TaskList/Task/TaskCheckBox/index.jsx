import { fetchUpdateTask } from "@/api/tasks";
import { useState } from "react";
import styles from "./TaskCheckbox.module.css";

export default function TaskCheckbox({ id, is_completed }) {
  const [done, setDone] = useState(is_completed);
  async function handleChange() {
    await fetchUpdateTask(id, { is_completed: !is_completed });
    setDone(!done);
  }
  return (
    <label className={styles["task-checkbox"]}>
      <input
        name="task-completed"
        type="checkbox"
        checked={done}
        onChange={handleChange}
      />
    </label>
  );
}
