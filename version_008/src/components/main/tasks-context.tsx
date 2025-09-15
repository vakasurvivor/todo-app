"use client";

import type { initialTask, Task } from "@/libs/types";
import { createContext, useContext, useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";

type TasksContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  filteredTasks: Task[];
  filter: "completed" | "incomplete" | null;
  setFilter: React.Dispatch<
    React.SetStateAction<"completed" | "incomplete" | null>
  >;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
};

const TasksContext = createContext<TasksContextType | null>(null);

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return context;
}

type TasksProviderProps = {
  initialTasks: initialTask[];
  initialFilter: "completed" | "incomplete" | null;
  initialSort?: "asc" | "desc";
  children: React.ReactNode;
};

export function TasksProvider({
  initialTasks,
  initialFilter = null,
  initialSort = "asc",
  children,
}: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(
    initialTasks.map((task) => ({
      ...task,
      isAdding: false,
      isEditing: false,
      isDeleting: false,
    }))
  );

  const [filter, setFilter] = useState<"completed" | "incomplete" | null>(
    initialFilter
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSort);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "completed") return task.isCompleted;
        if (filter === "incomplete") return !task.isCompleted;
        return true;
      })
      .sort((a, b) =>
        sortOrder === "asc"
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt)
      );
  }, [tasks, filter, sortOrder]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        filteredTasks,
        filter,
        setFilter,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
