import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            KataInk
          </span>

          <span className={styles.separator}>
            •
          </span>

          <span className={styles.text}>
            Treinamento de escrita Katakana
          </span>
        </div>

        <div className={styles.info}>
          <span>
            © {currentYear}
          </span>

          <span className={styles.separator}>
            •
          </span>

          <span>
            Desenvolvido com React +
            TypeScript
          </span>
        </div>
      </div>
    </footer>
  );
}