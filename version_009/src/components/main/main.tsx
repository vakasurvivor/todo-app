import { TasksProvider } from "./tasks-context";
import TaskAddFrom from "./task-add-from";
import TaskList from "./task-list";

import { getAllTasks } from "@/libs/data";
import { cn } from "@/utils/cn";

export default async function Main() {
  const initialTasks = await getAllTasks();
  return (
    <TasksProvider initialTasks={initialTasks}>
      <main className="grid place-items-center px-4 mb-12 relative">
        <div className="w-[min(100%,_500px)]">
          <TaskAddFrom
            className={cn(
              "bg-white z-10 pt-12 sticky top-16",
              "before:content-[''] before:absolute before:z-0 before:bottom-0 before:translate-y-full",
              "before:h-8 before:w-full before:border-t before:border-gray-200 ",
              "before:bg-gradient-to-b before:from-white before:to-transparent"
            )}
          />

          <TaskList className="mt-6" />
        </div>
      </main>
    </TasksProvider>
  );
}
