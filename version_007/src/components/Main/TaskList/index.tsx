"use client";

import Task from "./Task";
import { useTasksContext } from "../TasksContext";
import { cn } from "@/utils/cn";

export default function TaskList({ className }: { className?: string }) {
  const { tasks } = useTasksContext();
  return (
    <ul aria-busy="true" className={cn("w-full", className)}>
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </ul>
  );
}
