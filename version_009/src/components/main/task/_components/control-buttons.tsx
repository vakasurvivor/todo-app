import { useTasksContext } from "@/components/main/tasks-context";
import { actionDeleteTask } from "@/libs/actions";
import type { Task } from "@/libs/types";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ControlButtons({ task }: { task: Task }) {
  return (
    <div
      className="flex gap-x-2 [&>button]:size-6 [&>button]:p-1 [&>button]:rounded-sm"
      role="group"
      aria-label="タスクを操作する"
    >
      <TaskEditBtn id={task.id} className={"bg-green-200 hover:bg-green-300"} />
      <TaskDeleteBtn
        id={task.id}
        text={task.text}
        className={"bg-gray-300 hover:bg-red-300"}
      />
    </div>
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

type TaskDeleteBtnProps = {
  className?: string;
  id: number;
  text: string;
};
function TaskDeleteBtn({ className, id, text }: TaskDeleteBtnProps) {
  const { setTasks } = useTasksContext();
  const [isPending, startTransition] = useTransition();

  async function handleClick() {
    startTransition(async () => {
      try {
        const res = await actionDeleteTask(id);
        if (!res?.success) {
          toast.error(res.error.message);
          return;
        }

        startTransition(() => {
          setTasks((prev) => {
            return prev.map((t) =>
              t.id === id ? { ...t, isDeleting: true } : t
            );
          });
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={className}
          type="button"
          aria-label="タスクを削除する"
          disabled={isPending}
        >
          <Image src="/img/trash.svg" width="24" height="24" alt="" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[min(100%,_500px)]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            この操作は元に戻せません。削除しますか？
          </AlertDialogTitle>
          <AlertDialogDescription>「{text}」</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>中断する</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700 hover:bg-red-800"
            onClick={handleClick}
            disabled={isPending}
          >
            削除する
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
