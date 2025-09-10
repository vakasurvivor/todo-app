"use client";

import { cn } from "@/utils/cn";
import { useDialog } from "@/app/dialog-context";
import { useEffect, useRef } from "react";
import Image from "next/image";
import type { TechStack } from "@/libs/types";

const frontend: TechStack[] = [
  {
    src: "img/frontend/next-js.svg",
    title: "Next.js (App Router)",
  },
  {
    src: "img/frontend/typescript.svg",
    title: "TypeScript",
  },
  {
    src: "img/frontend/tailwindcss.svg",
    title: "TailwindCSS",
  },
  {
    src: "img/frontend/shadcn-ui.svg",
    title: "shadcn/ui",
  },
  {
    src: "img/frontend/motion.svg",
    title: "motion.dev",
  },
];

const backend: TechStack[] = [
  {
    src: "img/backend/vercel.svg",
    title: "Vercel CDN",
    subText: ["static (from Next.js)"],
  },
  {
    src: "img/backend/vercel.svg",
    title: "Vercel Function (AWS Lambda)",
    subText: ["Server Function (RPC)"],
  },
  {
    src: "img/backend/supabase.svg",
    title: "Supabase",
    subText: ["Supabase API (PostgREST)"],
  },
];

export default function Dialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen, closeDialog } = useDialog();

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen) {
      dialogRef.current.showModal();
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      dialogRef.current?.close();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!dialogRef.current) return;

    const dialogEl = dialogRef.current;
    const rect = dialogEl.getBoundingClientRect();

    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      closeDialog();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "fixed top-1/2 left-1/2 -translate-1/2 origin-top-right",
        "w-[min(100%,_500px)] max-h-[80dvh] p-4 rounded ",
        "border border-black/10 overflow-y-auto backdrop:bg-black/80",
        isOpen ? "dialog-fade-in" : "dialog-fade-out"
      )}
      aria-labelledby="tech-stack-label"
      id="tech-stack-dialog"
      onClose={closeDialog}
      onAnimationEnd={handleAnimationEnd}
      onClick={handleBackdropClick}
    >
      <section
        aria-labelledby="tech-stack-label"
        className="flex flex-col gap-y-4 "
      >
        <div className="flex gap-x-3 w-full pb-2 border-b border-black/10 justify-center">
          <Image width="24" height="24" src="img/layers.svg" alt="" />
          <h2 id="tech-stack-label">技術選定</h2>
        </div>
        <TechStack title="Frontend" techStack={frontend} />
        <TechStack title="Backend" techStack={backend} />
        <div className="w-full flex justify-end">
          <button
            aria-label="閉じる"
            className={cn(
              "close-dialog shadow-sm hover:bg-gray-200 py-1 px-2",
              "border-black/10 rounded-1 "
            )}
            type="button"
            onClick={() => {
              closeDialog();
            }}
          >
            閉じる
          </button>
        </div>
      </section>
    </dialog>
  );
}

function TechStack({
  title,
  techStack,
}: {
  title: string;
  techStack: TechStack[];
}) {
  return (
    <section
      aria-labelledby="frontend-label"
      className="border-b border-black/10 pb-3"
    >
      <h3 id="frontend-label" className="mb-2">
        {title}
      </h3>
      <ul className="pl-7">
        {techStack.map((t, i) => {
          return (
            <li
              key={i}
              className="relative before:content-['•'] before:absolute before:inline-block before:pr-1.5 before:top-0 before:-translate-x-full has-[img]:mb-1"
            >
              <div className="inline-flex items-center gap-x-1">
                <Image
                  className="w-[18px] aspect-square"
                  width="24"
                  height="24"
                  src={t.src}
                  alt=""
                  aria-hidden="true"
                />
                <span>{t.title}</span>
              </div>
              {t.subText && (
                <ul>
                  {t.subText.map((subText, i) => {
                    return <li key={i}>{subText}</li>;
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
