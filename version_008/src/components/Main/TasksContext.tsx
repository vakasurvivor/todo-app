"use client";

import type { initialTask, Task } from "@/libs/types";
import { createContext, useContext, useState } from "react";

type TasksContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TasksContext = createContext<TasksContextType | null>(null);

export function useTasksContext() {
  const context = useContext(TasksContext);

  if (context === null) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }

  return context;
}

type TasksProviderProps = {
  initialTasks: initialTask[];
  children: React.ReactNode;
};

export function TasksProvider({ initialTasks, children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(
    initialTasks.map((initialTask) => ({
      ...initialTask,
      isAdding: false,
      isEditing: false,
      isDeleting: false,
      isMovingUp: false,
    }))
  );

  return (
    <TasksContext
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </TasksContext>
  );
}
