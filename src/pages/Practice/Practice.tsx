import { useState } from "react";

import styles from "./Practice.module.css";

import CanvasBoard from "../../components/layout/CanvasBoard/CanvasBoard";
import PracticeSettings from "../../components/ui/PracticeSettings/PracticeSettings";

import { getAvailableKatakanas } from "../../utils/katakana/getAvailableKatakanas";

import { usePracticeSettings } from "../../hooks/usePracticeSettings";

import type { Katakana } from "../../types/Katakana";

const AVAILABLE_KATAKANAS =
  getAvailableKatakanas();

function getRandomKatakana(
  current?: Katakana
): Katakana {
  let next: Katakana;

  do {
    next =
      AVAILABLE_KATAKANAS[
      Math.floor(
        Math.random() *
        AVAILABLE_KATAKANAS.length
      )
      ];
  } while (
    current &&
    next.id === current.id &&
    AVAILABLE_KATAKANAS.length > 1
  );

  return next;
}

export default function Practice() {
  const {
    settings,
    setSettings,
  } = usePracticeSettings();

  const [
    currentKatakana,
    setCurrentKatakana,
  ] = useState<Katakana>(() =>
    getRandomKatakana()
  );

  const handleNext = () => {
    setCurrentKatakana(
      getRandomKatakana(
        currentKatakana
      )
    );
  };

  if (
    AVAILABLE_KATAKANAS.length === 0
  ) {
    return (
      <main className={styles.page}>
        <section
          className={styles.card}
        >
          <h2>
            Nenhum katakana possui
            template ainda.
          </h2>

          <p>
            Adicione templates em
            KATAKANAS.ts antes de
            iniciar a prática.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section
        className={styles.card}
      >
        <header
          className={styles.header}
        >
          <h1
            className={styles.title}
          >
            Prática de Katakana
          </h1>

          <p
            className={
              styles.subtitle
            }
          >
            Desenhe o caractere
            mostrado abaixo.
          </p>
        </header>

        <div
          className={
            styles.katakanaBox
          }
        >
          <div
            className={
              styles.katakana
            }
          >
            {
              currentKatakana.symbol
            }
          </div>
        </div>

        <div
          className={styles.info}
        >
          <span
            className={
              styles.badge
            }
          >
            ID:{" "}
            {currentKatakana.id}
          </span>

          <span
            className={
              styles.badge
            }
          >
            Traços:{" "}
            {
              currentKatakana.strokeCount
            }
          </span>

          <span
            className={
              styles.badge
            }
          >
            Dificuldade:{" "}
            {
              currentKatakana.difficulty
            }
          </span>
        </div>


        <div
          className={styles.board}
        >
          <CanvasBoard
            katakana={
              currentKatakana
            }
            settings={settings}
            onNext={handleNext}
          />
        </div>
        <PracticeSettings
          settings={settings}
          onChange={setSettings}
        />
      </section>
    </main>
  );
}