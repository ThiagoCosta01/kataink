import { useState } from "react";
import CanvasBoard from "../../components/layout/CanvasBoard/CanvasBoard";
import { KATAKANAS } from "../../data/Katakanas";
import type { Katakana } from "../../types/Katakana";

import styles from "./Practice.module.css";

function getRandomKatakana(current?: Katakana): Katakana {
  let next: Katakana;

  do {
    next = KATAKANAS[Math.floor(Math.random() * KATAKANAS.length)];
  } while (current && next.id === current.id && KATAKANAS.length > 1);

  return next;
}

export default function Practice() {
  const [currentKatakana, setCurrentKatakana] = useState(() =>
    getRandomKatakana()
  );

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>Prática de Katakana</h1>

          <p className={styles.subtitle}>
            Desenhe o caractere mostrado abaixo.
          </p>
        </header>

        <div className={styles.katakanaBox}>
          <div className={styles.katakana}>
            {currentKatakana.symbol}
          </div>
        </div>

        <div className={styles.info}>
          <span className={styles.badge}>
            ID: {currentKatakana.id}
          </span>

          <span className={styles.badge}>
            Traços: {currentKatakana.strokeCount}
          </span>

          <span className={styles.badge}>
            Dificuldade: {currentKatakana.difficulty}
          </span>
        </div>

        <div className={styles.board}>
          <CanvasBoard
            katakana={currentKatakana}
            onNext={() =>
              setCurrentKatakana(getRandomKatakana(currentKatakana))
            }
          />
        </div>
      </section>
    </main>
  );
}