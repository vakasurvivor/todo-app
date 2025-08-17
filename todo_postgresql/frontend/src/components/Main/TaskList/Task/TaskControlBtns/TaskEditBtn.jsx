import { useTasksContext } from "@/components/Main/TasksContext";

export default function TaskEditBtn({ className, id }) {
  const { setTasks } = useTasksContext();

  async function handleClick() {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, isEditing: true } : task))
    );
  }

  return (
    <button
      className={className}
      type="button"
      aria-label="タスクを編集する"
      onClick={handleClick}
    >
      <img src="/img/pen-line.svg" width="24" height="24" alt="" />
    </button>
  );
}
