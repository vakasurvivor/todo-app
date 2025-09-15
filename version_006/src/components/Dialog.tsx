"use client";

import { cn } from "@/utils/cn";
import { useDialog } from "@/app/DialogContext";
import { useEffect, useRef } from "react";
import Image from "next/image";

type TechStack = {
  frontend: {
    src: string;
    title: string;
    subText?: string[];
  }[];
  backend: {
    src: string;
    title: string;
    subText?: string[];
  }[];
};

const techStack: TechStack = {
  frontend: [
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
  ],
  backend: [
    {
      src: "img/backend/vercel.svg",
      title: "Vercel CDN",
      subText: ["static (from Next.js)"],
    },
    {
      src: "img/backend/vercel.svg",
      title: "Vercel Function (AWS Lambda)",
      subText: ["supabase-client"],
    },
    {
      src: "img/backend/supabase.svg",
      title: "Supabase (DB Server)",
      subText: ["PostgorSQL"],
    },
  ],
};

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

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "fixed top-1/2 left-1/2 -translate-1/2 ",
        "w-[min(100%,_500px)] max-h-[80dvh] p-4 rounded ",
        "border border-black/10 overflow-y-auto backdrop:bg-black/80",
        isOpen ? "dialog-fade-in" : "dialog-fade-out"
      )}
      aria-labelledby="tech-stack-label"
      id="tech-stack-dialog"
      onClose={closeDialog}
      onAnimationEnd={handleAnimationEnd}
    >
      <section
        aria-labelledby="tech-stack-label"
        className="flex flex-col gap-y-4 "
      >
        <div className="flex gap-x-4 w-full border-b border-black/10 justify-center">
          <Image width="24" height="24" src="img/layers.svg" alt="" />
          <h2 id="tech-stack-label">技術選定</h2>
        </div>
        <TechStack techStack={techStack} />
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

function TechStack({ techStack }: { techStack: TechStack }) {
  const { frontend, backend } = techStack;
  return (
    <>
      <section
        aria-labelledby="frontend-label"
        className="border-b border-black/10 pb-4"
      >
        <h3 id="frontend-label" className="mb-2">
          Frontend
        </h3>
        <ul className="pl-7">
          {frontend.map((f) => {
            return (
              <li
                key={f.src}
                className="relative before:content-['•'] before:absolute before:inline-block before:pr-1.5 before:top-0 before:-translate-x-full has-[img]:mb-1"
              >
                <div className="inline-flex items-center gap-x-1">
                  <Image
                    className="w-[18px] aspect-square"
                    width="24"
                    height="24"
                    src={f.src}
                    alt=""
                    aria-hidden="true"
                  />
                  <span>{f.title}</span>
                </div>
                {f.subText && (
                  <ul>
                    {f.subText.map((subText, i) => {
                      return <li key={i}>{subText[i]}</li>;
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <section
        aria-labelledby="backend-label"
        className="border-b border-black/10 pb-4"
      >
        <h3 id="backend-label">Backend</h3>
        <ul className="pl-7">
          {backend.map((b) => {
            return (
              <li
                key={b.src}
                className="relative before:content-['•'] before:absolute before:inline-block before:pr-1.5 before:top-0 before:-translate-x-full has-[img]:mb-1"
              >
                <div className="inline-flex items-center gap-x-1">
                  <Image
                    className="w-[18px] aspect-square"
                    width="24"
                    height="24"
                    src={b.src}
                    alt=""
                    aria-hidden="true"
                  />
                  <span>{b.title}</span>
                </div>
                {b.subText && (
                  <ul>
                    {b.subText.map((text, i) => {
                      return <li key={i}>{text}</li>;
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
