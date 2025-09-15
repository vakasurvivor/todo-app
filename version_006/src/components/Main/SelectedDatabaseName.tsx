import Image from "next/image";

export default function SelectedDatabaseName() {
  return (
    <section className="mb-2">
      <div className="opacity-50 w-fit flex items-center gap-1.5 ml-auto text-xs">
        <Image
          width="18"
          height="18"
          src="img/database.svg"
          alt=""
          aria-hidden="true"
        />
        <span>PostgrSQL</span>
      </div>
    </section>
  );
}
