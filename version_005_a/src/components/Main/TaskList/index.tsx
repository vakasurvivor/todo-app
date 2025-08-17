"use client";

import Task from "./Task";
import { useTasksContext } from "../TasksContext";

export default function TaskList() {
  const { tasks } = useTasksContext();
  return (
    <ul aria-busy="true" className="w-full">
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </ul>
  );
}
