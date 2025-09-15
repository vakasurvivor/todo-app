import { useTasksContext } from "@/components/main/tasks-context";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { useState } from "react";

type TaskEditBtnProps = {
  className?: string;
  id: number;
};
export default function TaskEditBtn({ className, id }: TaskEditBtnProps) {
  const { setTasks } = useTasksContext();
  const [isHover, setIsHover] = useState<boolean>(false);

  async function handleClick() {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, isEditing: true } : task))
    );
  }

  return (
    <motion.button
      className={cn(
        "size-6 p-1 rounded-sm",
        "bg-green-200 dark:bg-green-300 hover:bg-green-300 dark:hover:bg-green-400",
        className
      )}
      type="button"
      aria-label="タスクを変更する"
      onClick={handleClick}
      animate={isHover ? "wiggle" : "idle"}
      onHoverStart={() => {
        setIsHover(true);
      }}
      onHoverEnd={() => {
        setIsHover(false);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-pen-line-icon lucide-pen-line size-4"
      >
        <path d="M13 21h8" />
        <motion.path
          variants={{
            wiggle: {
              rotate: [15, 0],
              transition: { type: "spring", stiffness: 1500 },
            },
            idle: { rotate: 0 },
          }}
          initial={{ rotate: 0 }}
          d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
        />
      </svg>

      {/* <Image src="/img/pen-line.svg" width="24" height="24" alt="" /> */}
    </motion.button>
  );
}
