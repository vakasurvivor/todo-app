"use client";

import { useDialog } from "@/app/DialogContext";
import Image from "next/image";

export default function OpenDialogBtn() {
  const { openDialog } = useDialog();
  return (
    <button
      className="flex gap-x-1 p-2 rounded-full shadow-sm border border-black/10 self-center hover:bg-gray-200"
      aria-controls="tech-stack-dialog"
      aria-expanded="false"
      aria-haspopup="dialog"
      onClick={openDialog}
    >
      <Image
        className="w-5"
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
