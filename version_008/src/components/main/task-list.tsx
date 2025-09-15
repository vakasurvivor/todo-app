"use client";

import TaskItem from "./task-item";
import { useTasksContext } from "./tasks-context";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "@/utils/cn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function TaskList({ className }: { className?: string }) {
  const { filter, filteredTasks } = useTasksContext();
  return (
    <LayoutGroup>
      {filteredTasks && filteredTasks.length > 0 ? (
        <ul
          className={cn("flex flex-col gap-y-4 w-full", className)}
          aria-busy="true"
        >
          <AnimatePresence>
            {filteredTasks.map((task) => {
              return <TaskItem key={task.id} task={task} />;
            })}
          </AnimatePresence>
        </ul>
      ) : (
        <motion.div
          className={cn("mt-12", className)}
          aria-busy="true"
          transition={{ duration: 0.3, ease: "easeOut" }}
          initial={{ opacity: 0, y: "6px" }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert>
            <AlertCircleIcon />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              {filter === null && (
                <p>タスクがありません。新しく作成してください。</p>
              )}
              {filter === "incomplete" && <p>未完了のタスクはありません。</p>}
              {filter === "completed" && <p>完了したタスクはありません。</p>}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </LayoutGroup>
  );
}
