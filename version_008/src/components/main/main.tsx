import { TasksProvider } from "./tasks-context";
import TaskAddFrom from "./task-add-from";
import TaskList from "./task-list";
import { getAllTasks } from "@/libs/data";
import { cn } from "@/utils/cn";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default async function Main({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // 全件取得
  const initialTasks = await getAllTasks();
  // 初期表示の安定させるために、searchParams を Dynamic Rendering で解決
  const { filter: initialFilter = null, sort: initialSort = "asc" } =
    await searchParams;

  return (
    <TasksProvider
      initialTasks={initialTasks}
      initialFilter={initialFilter as "completed" | "incomplete" | null}
      initialSort={initialSort as "asc" | "desc"}
    >
      <main className="grid place-items-center px-4 mb-12 relative">
        <div className="w-[min(100%,_500px)]">
          <TaskAddFrom
            className={cn(
              "bg-background z-10 pt-12 sticky top-16",
              "before:content-[''] before:absolute before:z-5 before:bottom-0 before:translate-y-full",
              "before:h-8 before:w-full before:border-t before:border-border ",
              "before:bg-gradient-to-b before:from-background before:to-transparent"
            )}
          />

          <TaskList className="mt-6" />
        </div>
      </main>
    </TasksProvider>
  );
}
