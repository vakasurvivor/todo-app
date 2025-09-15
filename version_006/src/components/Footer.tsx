import Image from "next/image";

export default function Footer() {
  return (
    <footer className="sticky top-[100vh] flex items-center justify-center gap-x-2 py-4  w-full border-t border-black/10">
      <a href="https://github.co.jp/" rel="noopener noreferrer" target="_blank">
        <Image
          className="inline-block w-[18px] align-[-13%] mr-1"
          width="15"
          height="15"
          src="img/github.svg"
          alt="Github icon"
        />
        GitHub
      </a>
      <small>@vakasurvivor</small>
    </footer>
  );
}
