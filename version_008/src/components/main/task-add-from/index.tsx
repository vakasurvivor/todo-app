"use client";

import { initialTask, Task } from "@/libs/types";
import { Suspense, useActionState, useEffect } from "react";
import { actionAddTask } from "@/libs/actions";
import { useTasksContext } from "@/components/main/tasks-context";
import FilterTasks from "./_components/filter-tasks";
import SortOrderTasks from "./_components/sort-order-tasks";
import SelectedDatabase from "./_components/selected-database";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { toast } from "sonner";

export default function TaskAddFrom({ className }: { className?: string }) {
  const { setTasks } = useTasksContext();
  const [result, formAction, isPending] = useActionState(actionAddTask, null);

  useEffect(() => {
    if (result !== null) {
      // 成功と失敗のロジックを分離
      if (result.success && "data" in result) {
        // 成功した場合：result.data は存在することが保証される
        const newTask: Task = {
          ...(result.data as initialTask),
          isAdding: true,
          isEditing: false,
          isDeleting: false,
        };
        setTasks((prev) => [...prev, newTask]);
      } else {
        // 失敗した場合：result.error が存在するかチェック
        if ("error" in result) {
          toast.error(result.error.message);
        } else {
          toast.error("タスクの追加に失敗しました。");
        }
      }
    }
  }, [result, setTasks]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const inputEl = e.currentTarget.elements.namedItem(
      "text"
    ) as HTMLInputElement;

    if (!inputEl.value.trim()) {
      e.preventDefault();
      inputEl.value = "";
      inputEl.focus();
      return;
    }
  };

  return (
    <section className={cn(className)}>
      <SelectedDatabase isPending={isPending} />
      <form
        className={"relative w-full"}
        action={formAction}
        onSubmit={handleSubmit}
      >
        <input
          className={cn(
            "w-full p-2 bg-background rounded-sm",
            "border border-border outline-2 outline-transparent transition-[border,_outline]",
            "focus:outline-ring focus:border-transparent"
          )}
          maxLength={50}
          placeholder="🚀 新しいタスクを作成する"
          name="text"
          type="text"
          disabled={isPending}
        />
        <button
          type="submit"
          className={cn(
            "absolute top-1/2 right-4 -translate-y-1/2 size-6 p-1 rounded-sm ",
            "bg-blue-100 dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300"
          )}
          aria-label="タスクを追加する"
        >
          <Image height="24" width="24" src="img/plus.svg" alt="" />
        </button>
      </form>
      <div className="flex justify-end items-center gap-x-2 pt-5 pb-5">
        <Suspense fallback={<FilterTasksSkeleton />}>
          <FilterTasks />
        </Suspense>
        <Suspense fallback={<SortTasksSkeleton />}>
          <SortOrderTasks />
        </Suspense>
      </div>
    </section>
  );
}

function FilterTasksSkeleton() {
  return (
    <div className="h-[26px] w-[52px] bg-muted rounded-sm animate-pulse" />
  );
}

function SortTasksSkeleton() {
  return <div className="size-[26px] bg-muted rounded-sm animate-pulse" />;
}
