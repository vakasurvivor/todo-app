import { cn } from "@/utils/cn";

import OpenDialogBtn from "./OpenDialogBtn";

export default function Header() {
  return (
    <header
      className={cn(
        "sticky z-100 top-0 left-0 w-full px-4 border-b border-black/10 backdrop-blur"
      )}
    >
      <div className="flex justify-between mx-auto py-4 w-[min(100%,_500px)]">
        <h1 className="self-center text-[clamp(1.25rem,_0.909rem_+_1.7vw,_2rem)]">
          Todo App
        </h1>
        <OpenDialogBtn />
      </div>
    </header>
  );
}
