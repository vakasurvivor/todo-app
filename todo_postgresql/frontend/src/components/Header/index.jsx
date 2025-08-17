import styles from "./Header.module.css";
import { useDialog } from "@/DialogContext";

export default function Header() {
  const { openDialog } = useDialog();
  return (
    <header className={styles.header}>
      <div>
        <h1>Todo App</h1>
        <button
          aria-controls="tech-stack-dialog"
          aria-expanded="false"
          aria-haspopup="dialog"
          className="shadow-sm"
          onClick={openDialog}
        >
          <img
            width="24"
            height="24"
            src="img/layers.svg"
            alt=""
            aria-hidden="true"
          />
          <span className="sr-only">技術選定</span>
        </button>
      </div>
    </header>
  );
}
