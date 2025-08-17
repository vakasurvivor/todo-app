import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://github.co.jp/" rel="noopener noreferrer" target="_blank">
        <img alt="Github icon" height="15" src="img/github.svg" width="15" />
        GitHub
      </a>
      <small>@vakasurvivor</small>
    </footer>
  );
}
