import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>

        <div className={styles.brand}>
          <div className={styles.text}>
            <h1>Kataink</h1>
            <span>Prática de Escrita Katakana</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Praticar
          </Link>

          <Link to="/about" className={styles.link}>
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}