import { fetchDeleteTask } from "@/api/tasks";
import { useTasksContext } from "@/components/Main/TasksContext";

export default function TaskDeleteBtn({ className, id }) {
  const { setTasks } = useTasksContext();

  async function handleClick() {
    const res = window.confirm("削除して宜しいですか？");
    if (res) {
      await fetchDeleteTask(id);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isDeleting: true } : task
        )
      );
    }
  }

  return (
    <button
      className={className}
      type="button"
      aria-label="タスクを削除する"
      onClick={handleClick}
    >
      <img src="/img/trash.svg" width="24" height="24" alt="" />
    </button>
  );
}
