import clsx from "clsx";
import TaskCheckbox from "./TaskCheckBox";
import TaskTextInput from "./TaskTextInput";
import TaskControlBtns from "./TaskControlBtns";
import { useTasksContext } from "@/components/Main/TasksContext";
import type { Task } from "@/libs/types";

export default function Task({ task }: { task: Task }) {
  const { tasks, setTasks } = useTasksContext();

  const handleAnimationEnd = () => {
    if (task.isAdding) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, isAdding: false } : t))
      );
    }

    if (task.isDeleting) {
      const index = tasks.findIndex((t) => t.id === task.id);
      if (index === -1) return;

      setTasks((prev) => {
        return prev
          .filter((t) => t.id !== task.id)
          .map((t, i) => (i >= index ? { ...t, isMovingUp: true } : t));
      });
    }

    if (task.isMovingUp) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, isMovingUp: false } : t))
      );
    }
  };

  return (
    <li
      data-task-item-id={task.id}
      className={clsx(
        "flex items-center justify-between gap-x-2  mb-4 py-2 border-b border-black/10",
        task.isAdding && "fade-in",
        task.isDeleting && "fade-out",
        task.isMovingUp && "fade-up"
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      <TaskCheckbox id={task.id} isCompleted={task.isCompleted} />
      <TaskTextInput
        id={task.id}
        isEditing={task.isEditing}
        originalText={task.text}
      />
      <TaskControlBtns task={task} />
    </li>
  );
}
