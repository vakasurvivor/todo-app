"use client";

import { actionAddTask } from "@/libs/actions";
import { useActionState, useEffect } from "react";
import { useTasksContext } from "@/components/Main/TasksContext";
import { cn } from "@/utils/cn";
import Image from "next/image";

export default function TaskAddFrom() {
  const { setTasks } = useTasksContext();
  const [result, formAction, isPending] = useActionState(actionAddTask, null);

  useEffect(() => {
    if (!result?.success || !("data" in result)) return;

    const addTask = {
      ...result.data,
      isAdding: true,
      isEditing: false,
      isDeleting: false,
      isMovingUp: false,
    };

    setTasks((prev) => [...prev, addTask]);
  }, [result, setTasks]);

  return (
    <form
      className={cn("relative w-full")}
      action={formAction}
      onSubmit={(e) => {
        const inputEl = e.currentTarget.elements.namedItem(
          "text"
        ) as HTMLInputElement;

        if (!inputEl.value.trim()) {
          e.preventDefault();
          inputEl.focus();
          return;
        }
      }}
    >
      <input
        className={cn(
          "w-full p-2 bg-white rounded-sm",
          "border border-black/10 outline-2 outline-transparent transition-[border,_outline]",
          "focus:outline-black/20 focus:border-transparent"
        )}
        maxLength={50}
        placeholder="🚀 New Task"
        name="text"
        type="text"
        disabled={isPending}
      />
      <button
        className={
          "absolute top-1/2 right-4 -translate-y-1/2 size-6 p-1 rounded-sm bg-blue-100 hover:bg-blue-200"
        }
        type="submit"
        aria-label="タスクを追加する"
      >
        <Image height="24" width="24" src="img/plus.svg" alt="" />
      </button>
    </form>
  );
}
