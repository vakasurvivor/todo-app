import { useTasksContext } from "@/components/main/tasks-context";
import { actionDeleteTask } from "@/libs/actions";
import { useState, useTransition } from "react";
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
import { cn } from "@/utils/cn";
import { motion } from "motion/react";

type TaskDeleteBtnProps = {
  className?: string;
  id: number;
  text: string;
};

export default function TaskDeleteBtn({
  className,
  id,
  text,
}: TaskDeleteBtnProps) {
  const { setTasks } = useTasksContext();
  const [isPending, startTransition] = useTransition();
  const [isHover, setIsHover] = useState<boolean>(false);

  async function handleClick() {
    startTransition(async () => {
      try {
        const res = await actionDeleteTask(id);
        if (!res.success && "error" in res) {
          toast.error(res.error.message);
        } else if (!res.success) {
          toast.error("タスクの削除に失敗しました。");
        }

        startTransition(() => {
          setTasks((prev) => {
            return prev.map((t) =>
              t.id === id ? { ...t, isDeleting: true } : t
            );
          });
        });
      } catch {
        toast.error("タスクの削除に失敗しました。");
      }
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <motion.button
          className={cn(
            "size-6 rounded-sm grid place-items-center",
            "bg-gray-300 hover:bg-red-300 dark:hover:bg-red-400",
            className
          )}
          aria-label="タスクを削除する"
          disabled={isPending}
          animate={isHover ? "open" : "close"}
          onHoverStart={() => {
            setIsHover(true);
          }}
          onHoverEnd={() => {
            setIsHover(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[18px]"
          >
            <path d="M12 13V19" />
            <path d="M16 13V19" />
            <path d="M21 8V22C21 22.5304 20.7893 23.0391 20.4142 23.4142C20.0391 23.7893 19.5304 24 19 24H9C8.46957 24 7.96086 23.7893 7.58579 23.4142C7.21071 23.0391 7 22.5304 7 22V8" />
            <motion.g
              variants={{
                open: {
                  rotate: 11,
                  transition: { type: "spring", stiffness: 500 },
                },
                close: { rotate: 0 },
              }}
              initial={{ rotate: 0, transformOrigin: "bottom right" }}
            >
              <path d="M5 8H23" />
              <path d="M10 8V6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4H16C16.5304 4 17.0391 4.21071 17.4142 4.58579C17.7893 4.96086 18 5.46957 18 6V8" />
            </motion.g>
          </svg>
        </motion.button>
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
            className="bg-red-700 hover:bg-red-800 dark:bg-red-400 dark:hover:bg-red-500"
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
