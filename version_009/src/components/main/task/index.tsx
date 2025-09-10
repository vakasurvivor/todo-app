import Checkbox from "./_components/checkbox";
import TextInput from "./_components/text-input";
import ControlButtons from "./_components/control-buttons";
import type { Task } from "@/libs/types";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTasksContext } from "../tasks-context";

export default function Task({ task }: { task: Task }) {
  const { setTasks, sortOrder } = useTasksContext();
  const [status, setStatus] = useState<
    "fadeInAsc" | "fadeInDesc" | "fadeOut" | false
  >(false);

  useEffect(() => {
    if (task.isAdding && sortOrder === "asc") {
      setStatus("fadeInAsc");
      setTasks((prev) => {
        return prev.map((t) =>
          t.id === task.id ? { ...t, isAdding: false } : t
        );
      });
    }

    if (task.isAdding && sortOrder === "desc") {
      setStatus("fadeInDesc");
      setTasks((prev) => {
        return prev.map((t) =>
          t.id === task.id ? { ...t, isAdding: false } : t
        );
      });
    }

    if (task.isDeleting) {
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
  }, [sortOrder, task, setTasks]);

  const taskVariants = {
    fadeInAsc: { opacity: [0, 1], y: ["6px", 0] },
    fadeInDesc: {
      opacity: [0, 0, 1],
      x: [-10, 0],
    },
    fadeOut: {
      opacity: 0,
      x: 10,
    },
  };
  return (
    <motion.li
      className={cn(
        "flex items-center justify-between gap-x-2 py-2 border-b border-black/10"
      )}
      transition={{
        default: { duration: 0.3, ease: "easeOut" },
        layout: { duration: 0.3, ease: "easeOut" },
      }}
      variants={taskVariants}
      initial={false}
      animate={status}
      exit={task.isDeleting ? "fadeOut" : undefined}
      layout
    >
      <Checkbox id={task.id} isCompleted={task.isCompleted} />
      <TextInput
        id={task.id}
        isEditing={task.isEditing}
        originalText={task.text}
      />
      <ControlButtons task={task} />
    </motion.li>
  );
}
