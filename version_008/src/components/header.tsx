"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import type { TechStack } from "@/libs/types";
import { Layers } from "lucide-react";
import { Button } from "./ui/button";
import { motion, Variants } from "motion/react";
import { useEffect, useState } from "react";

export default function Header() {
  return (
    <header
      className={cn(
        "sticky z-50 top-0 left-0 w-full px-4 border-b border-border bg-background h-16 flex items-center"
      )}
    >
      <div className="flex justify-between items-center mx-auto w-[min(100%,_500px)]">
        <h1 className="text-[clamp(1.25rem,_0.909rem_+_1.7vw,_2rem)] font-semibold">
          Todo App
        </h1>

        <div className="flex items-center space-x-4 h-8">
          <ThemeSwitch />
          <Separator className="h-full" orientation="vertical" />
          <OpenDialogBtn />
        </div>
      </div>
    </header>
  );
}

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={(checked) => {
        if (checked) {
          return setTheme("dark");
        } else {
          return setTheme("light");
        }
      }}
    />
  );
}

function OpenDialogBtn() {
  const [isHover, setIsHover] = useState<boolean>(false);

  const pathVariants: Variants = {
    idle: { pathLength: 0.55, pathOffset: 0.25 },
    hover: (index: number) => {
      return {
        pathLength: [1, 0.3],
        pathSpacing: [0, 0.45],
        pathOffset: [0, 0],
        rotate: 180,
        transition: {
          delay: 0.025 * index,
        },
      };
    },
  };

  const pathTopVariants: Variants = {
    idle: { pathLength: 1, pathOffset: 0 },
    hover: (index: number) => ({
      rotate: 180,
      transition: {
        delay: 0.025 * index,
      },
    }),
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="rounded-full size-8 [&_svg]:pointer-events-auto"
          variant={"outline"}
          size={"icon"}
          asChild
        >
          <motion.button
            animate={isHover ? "hover" : "idle"}
            onHoverStart={() => {
              setIsHover(true);
            }}
            onHoverEnd={() => {
              setIsHover(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "size-[18px]",
                isHover ? "fill-accent dark:fill-accent/50" : "fill-background"
              )}
              aria-hidden="true"
            >
              <motion.path
                initial={{ pathLength: 0.55, pathOffset: 0.25 }}
                variants={pathVariants}
                custom={1}
                d="M12.8265 12.1804C12.566 12.0615 12.2829 12 11.9965 12C11.7102 12 11.4271 12.0615 11.1665 12.1804L2.59655 16.0804C2.4191 16.1586 2.26823 16.2868 2.16231 16.4492C2.05639 16.6117 2 16.8014 2 16.9954C2 17.1893 2.05639 17.379 2.16231 17.5415C2.26823 17.704 2.4191 17.8321 2.59655 17.9104L11.1765 21.8204C11.4371 21.9392 11.7202 22.0007 12.0065 22.0007C12.2929 22.0007 12.576 21.9392 12.8365 21.8204L21.4165 17.9204C21.594 17.8421 21.7449 17.714 21.8508 17.5515C21.9567 17.389 22.0131 17.1993 22.0131 17.0054C22.0131 16.8114 21.9567 16.6217 21.8508 16.4592C21.7449 16.2968 21.594 16.1686 21.4165 16.0904L12.8265 12.1804Z"
              />

              <motion.path
                initial={{ pathLength: 0.55, pathOffset: 0.25 }}
                variants={pathVariants}
                custom={2}
                d="M12.8265 7.18036C12.566 7.06151 12.2829 7 11.9965 7C11.7102 7 11.4271 7.06151 11.1665 7.18036L2.59655 11.0804C2.4191 11.1586 2.26823 11.2868 2.16231 11.4492C2.05639 11.6117 2 11.8014 2 11.9954C2 12.1893 2.05639 12.379 2.16231 12.5415C2.26823 12.704 2.4191 12.8321 2.59655 12.9104L11.1765 16.8204C11.4371 16.9392 11.7202 17.0007 12.0065 17.0007C12.2929 17.0007 12.576 16.9392 12.8365 16.8204L21.4165 12.9204C21.594 12.8421 21.7449 12.714 21.8508 12.5515C21.9567 12.389 22.0131 12.1993 22.0131 12.0054C22.0131 11.8114 21.9567 11.6217 21.8508 11.4592C21.7449 11.2968 21.594 11.1686 21.4165 11.0904L12.8265 7.18036Z"
              />
              <motion.path
                variants={pathTopVariants}
                custom={3}
                d="M12.83 2.18001C12.5694 2.06115 12.2864 1.99965 12 1.99965C11.7136 1.99965 11.4306 2.06115 11.17 2.18001L2.59999 6.08001C2.42254 6.15825 2.27167 6.2864 2.16576 6.44886C2.05984 6.61132 2.00345 6.80107 2.00345 6.99501C2.00345 7.18894 2.05984 7.37869 2.16576 7.54115C2.27167 7.70361 2.42254 7.83176 2.59999 7.91001L11.18 11.82C11.4406 11.9389 11.7236 12.0004 12.01 12.0004C12.2964 12.0004 12.5794 11.9389 12.84 11.82L21.42 7.92001C21.5974 7.84176 21.7483 7.71361 21.8542 7.55115C21.9601 7.38869 22.0165 7.19894 22.0165 7.00501C22.0165 6.81107 21.9601 6.62132 21.8542 6.45886C21.7483 6.2964 21.5974 6.16825 21.42 6.09001L12.83 2.18001Z"
              />
            </svg>
            <span className="sr-only">技術選定</span>
          </motion.button>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[min(100%,_500px)]">
        <DialogHeader>
          <div className="flex gap-x-3 w-full pb-2 border-b border-border justify-center items-center">
            <Layers className="size-6" strokeWidth={1.5} aria-hidden="true" />
            <DialogTitle className="text-2xl font-medium">技術選定</DialogTitle>
          </div>
        </DialogHeader>
        <section
          aria-labelledby="tech-stack-label"
          className="flex flex-col gap-y-4 "
        >
          <TechnologyStack title="Frontend" techStack={"frontend"} />
          <TechnologyStack title="Backend" techStack={"backend"} />
        </section>
        <DialogFooter>
          <DialogClose asChild>
            <Button aria-label="閉じる">閉じる</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TechnologyStack({
  title,
  techStack,
}: {
  title: string;
  techStack: "frontend" | "backend";
}) {
  const { theme } = useTheme();
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
      src: `img/frontend/shadcn_ui_${theme}.svg`,
      title: "shadcn/ui",
    },
    {
      src: `img/frontend/motion_${theme}.svg`,
      title: "motion.dev",
    },
  ];

  const backend: TechStack[] = [
    {
      src: `img/backend/vercel_${theme}.svg`,
      title: "Vercel CDN",
      subText: ["static (from Next.js)"],
    },
    {
      src: `img/backend/vercel_${theme}.svg`,
      title: "Vercel Function (AWS Lambda)",
      subText: ["Server Function (RPC)"],
    },
    {
      src: "img/backend/supabase.svg",
      title: "Supabase",
      subText: ["Supabase API (PostgREST)"],
    },
  ];

  const stack = techStack === "frontend" ? frontend : backend;

  return (
    <section
      aria-labelledby="frontend-label"
      className="border-b border-border pb-3"
    >
      <h3 id="frontend-label" className="mb-2 text-xl font-medium">
        {title}
      </h3>
      <ul className="pl-7">
        {stack.map((t, i) => {
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
