import styles from "./SelectedDatabase.module.css";

export default function SelectedDatabase() {
  return (
    <section className={styles.section}>
      <div>
        <img
          width="18"
          height="18"
          src="img/database.svg"
          alt=""
          aria-hidden="true"
        />
        <span>PostgreSQL</span>
      </div>
    </section>
  );
}
