import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>

        <Link to="/" className={styles.brand}>
          <div className={styles.text}>
            <h1>KataInk</h1>
            <span>Prática de Katakana</span>
          </div>
        </Link>

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