import { useTasksContext } from "@/components/main/tasks-context";
import { Toggle } from "@/components/ui/toggle";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function SortOrderTasks() {
  const { sortOrder, setSortOrder } = useTasksContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const sortOrderParams = searchParams.get("sort");
    const initialSortOrder = sortOrderParams === "desc" ? "desc" : "asc";
    setSortOrder(initialSortOrder);
  }, [searchParams, setSortOrder]);

  function handleSortChange(pressed: boolean) {
    setSortOrder(pressed ? "desc" : "asc");
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (pressed) {
      newSearchParams.set("sort", "desc");
    } else {
      newSearchParams.delete("sort");
    }
    router.replace(`?${newSearchParams.toString()}`);
  }

  const arrowD = sortOrder === "desc" ? "m3 16 4 4 4-4" : "m3 8 4-4 4 4";
  const line_001_D = sortOrder === "desc" ? "M11 12h4" : "M11 20h10";
  const line_002_D = sortOrder === "desc" ? "M11 8h7" : "M11 16h7";
  const line_003_D = sortOrder === "desc" ? "M11 4h10" : "M11 12h4";

  return (
    <Toggle
      className="h-6.5 min-w-6.5 p-1 rounded-sm gap-1.5"
      aria-label="作成日で並び替える"
      variant="outline"
      pressed={sortOrder === "desc"}
      onPressedChange={(pressed) => handleSortChange(pressed)}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M7 4v16" />
        <motion.path
          key={`arrow-${sortOrder}`}
          initial={{ d: arrowD, opacity: 1 }}
          animate={{
            d: arrowD,
            opacity: [0, 1],
            transition: {
              ease: "easeInOut",
            },
          }}
        />
        <motion.g>
          <motion.path
            initial={{ d: line_001_D }}
            animate={{
              d: line_001_D,
              transition: {
                ease: "easeInOut",
              },
            }}
          />
          <motion.path
            initial={{ d: line_002_D }}
            animate={{
              d: line_002_D,
              transition: {
                ease: "easeInOut",
              },
            }}
          />
          <motion.path
            initial={{ d: line_003_D }}
            animate={{
              d: line_003_D,
              transition: {
                ease: "easeInOut",
              },
            }}
          />
        </motion.g>
      </motion.svg>
    </Toggle>
  );
}
