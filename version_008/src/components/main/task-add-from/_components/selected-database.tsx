import { motion, Variants } from "motion/react";

export default function SelectedDatabase({
  isPending,
}: {
  isPending: boolean;
}) {
  const draw: Variants = {
    loading: {
      pathLength: [0, 1],
      opacity: [0, 1],
      stroke: ["var(--color-green-500)", "var(--color-green-500)"],
      filter: [
        "drop-shadow(0px 0px 1px var(--color-green-600))",
        "drop-shadow(0px 0px 1px var(--color-green-600))",
      ],
      transition: {
        pathLength: {
          duration: 0.4,
          repeat: Infinity,
        },
        opacity: {
          duration: 0.1,
        },
        filter: {
          duration: 0.4,
          repeat: Infinity,
        },
      },
    },
    idle: {
      pathLength: 1,
      opacity: 1,
      filter: "drop-shadow(0px 0px 0px transparent)",
      stroke: "var(--color-muted-foreground)",
      transition: {
        pathLength: { duration: 0.1 },
        opacity: { duration: 0.1 },
        filter: { duration: 0.1 },
      },
    },
  };

  return (
    <div className="w-fit flex items-center gap-1.5 ml-auto mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-muted-foreground"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5V19A9 3 0 0 0 15 21.84"></path>
        <path d="M21 5V8"></path>
        <path d="M3 12A9 3 0 0 0 14.59 14.87"></path>
        <motion.path
          variants={draw}
          initial="idle"
          animate={isPending ? "loading" : "idle"}
          d="M21 12L18 17H22L19 22"
        ></motion.path>
      </svg>
      <span className="text-muted-foreground text-xs">Supabase</span>
    </div>
  );
}
