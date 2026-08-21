import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.topContainer}>

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

          <div className={styles.logoContainer}>
            <Link to="https://github.com/ThiagoCosta01/kataink" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </Link>

            <Link to="https://www.linkedin.com/in/thiago-costa-dev/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </Link>
          </div>
        </div>

        <div className={styles.info}>
          <span>
            © {currentYear}
          </span>

          <span className={styles.separator}>
            •
          </span>

          <Link to="https://thiagocostadev.com/" target="_blank" rel="noopener noreferrer">
            <span>
              Desenvolvido por Thiago Costa
            </span>
          </Link>

        </div>

      </div>
    </footer>
  );
}