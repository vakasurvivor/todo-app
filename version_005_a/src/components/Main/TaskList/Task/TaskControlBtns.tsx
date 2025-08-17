import { fetchDeleteTask } from "@/utils/db-feach";
import { useTasksContext } from "@/components/Main/TasksContext";
import Image from "next/image";

export default function TaskControlBtns({ task }) {
  return (
    <div
      className="flex gap-x-2 [&>button]:size-6 [&>button]:p-1 [&>button]:rounded-sm"
      role="group"
      aria-label="タスクを操作する"
    >
      <TaskEditBtn id={task.id} className={"bg-green-200 hover:bg-green-300"} />
      <TaskDeleteBtn id={task.id} className={"bg-gray-300 hover:bg-red-300"} />
    </div>
  );
}

type TaskDeleteBtnProps = {
  className?: string;
  id: number;
};
function TaskDeleteBtn({ className, id }: TaskDeleteBtnProps) {
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
      <Image src="/img/trash.svg" width="24" height="24" alt="" />
    </button>
  );
}

type TaskEditBtnProps = {
  className: string;
  id: number;
};
function TaskEditBtn({ className, id }: TaskEditBtnProps) {
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
      aria-label="タスクを変更する"
      onClick={handleClick}
    >
      <Image src="/img/pen-line.svg" width="24" height="24" alt="" />
    </button>
  );
}
