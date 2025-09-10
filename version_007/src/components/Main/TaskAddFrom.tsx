"use client";

import { useState, useRef } from "react";
import { useTasksContext } from "@/components/Main/TasksContext";
import { fetchAddTask, fetchGetTask } from "@/utils/db-feach";
import { cn } from "@/utils/cn";
import Image from "next/image";

export default function TaskAddFrom() {
  const { setTasks } = useTasksContext();
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputText) {
      inputRef.current?.focus();
      return;
    }

    const { id } = await fetchAddTask(inputText);
    const res = await fetchGetTask(id);

    const newTask = {
      ...res,
      isAdding: true,
      isEditing: false,
      isDeleting: false,
      isMovingUp: false,
    };

    if (res) {
      setInputText("");
      setTasks((prev) => [...prev, newTask]);
    }
  }

  return (
    <form className={cn("relative w-full mb-8")} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className={cn(
          "w-full p-2 bg-white rounded-sm",
          "border border-black/10 outline-2 outline-transparent transition-[border,_outline]",
          "focus:outline-black/20 focus:border-transparent"
        )}
        id="task-input"
        maxLength={50}
        placeholder="🚀 新しいタスクを追加する"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
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
