"use client";

import { cn } from "@/utils/cn";
import { useDialog } from "@/app/dialog-context";
import Image from "next/image";

export default function Header() {
  return (
    <header
      className={cn(
        "sticky z-50 top-0 left-0 w-full px-4 border-b border-black/10 bg-white h-16 flex items-center"
      )}
    >
      <div className="flex justify-between items-center mx-auto w-[min(100%,_500px)]">
        <h1 className="text-[clamp(1.25rem,_0.909rem_+_1.7vw,_2rem)]">
          Todo App
        </h1>
        <OpenDialogBtn />
      </div>
    </header>
  );
}

function OpenDialogBtn() {
  const { openDialog } = useDialog();
  return (
    <button
      className="flex gap-x-1 p-1.5 rounded-full shadow-sm border border-black/10 self-center hover:bg-gray-200"
      aria-controls="tech-stack-dialog"
      aria-expanded="false"
      aria-haspopup="dialog"
      onClick={openDialog}
    >
      <Image
        className="w-4"
        width="24"
        height="24"
        src="img/layers.svg"
        aria-hidden="true"
        alt=""
      />
      <span className="sr-only">技術選定</span>
    </button>
  );
}
