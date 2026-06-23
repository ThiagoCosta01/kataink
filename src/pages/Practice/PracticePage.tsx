import { useState } from "react";

import styles from "./PracticePage.module.css";

import CanvasBoard from "../../components/layout/CanvasBoard/CanvasBoard";
import PracticeSettings from "../../components/ui/PracticeSettings/PracticeSettings";
import GameScore from "../../components/layout/GameScore/GameScore";

import { getAvailableKatakanas } from "../../utils/katakana/getAvailableKatakanas";

import { usePracticeSettings } from "../../hooks/usePracticeSettings";
import { usePracticeScore } from "../../hooks/useGameScore";

import type { Katakana } from "../../types/Katakana";

const AVAILABLE_KATAKANAS = getAvailableKatakanas();

function getRandomKatakana(current?: Katakana): Katakana {
  let next: Katakana;

  do {
    next =
      AVAILABLE_KATAKANAS[
      Math.floor(Math.random() * AVAILABLE_KATAKANAS.length)
      ];
  } while (
    current &&
    next.id === current.id &&
    AVAILABLE_KATAKANAS.length > 1
  );

  return next;
}

export default function PracticePage() {
  const {
    scores,
    currentRound,
    totalRounds,
    totalScore,
    averageScore,
    finished,
    addScore,
  } = usePracticeScore();

  const { settings, setSettings } = usePracticeSettings();

  const [currentKatakana, setCurrentKatakana] = useState<Katakana>(() =>
    getRandomKatakana()
  );

  const handleNext = () => {
    setCurrentKatakana((prev) => getRandomKatakana(prev));
  };

  if (AVAILABLE_KATAKANAS.length === 0) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <h2>Nenhum katakana possui template ainda.</h2>
          <p>
            Adicione templates em KATAKANAS.ts antes de iniciar a prática.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>KataInk</h1>
          <p className={styles.subtitle}>
            Desenhe o caractere mostrado.
          </p>
        </div>
      </header>
      <section className={styles.card}>
        <div className={styles.left}>


        </div>

        <div className={styles.center}>
          <div className={styles.katakanaBox}>
            <div className={styles.katakana}>
              {currentKatakana.symbol}
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
            <PracticeSettings
              settings={settings}
              onChange={setSettings}
            />
          </div>

          <div className={styles.right} >

            <div className={styles.board}>
              <CanvasBoard
                katakana={currentKatakana}
                settings={settings}
                onScore={(score) =>
                  addScore(score, currentKatakana.id)
                }
                onNext={handleNext}
              />
            </div>

            <GameScore
              currentRound={currentRound}
              totalRounds={totalRounds}
              totalScore={totalScore}
              averageScore={averageScore}
              scores={scores}
              finished={finished}
            />
          </div>

        </div>
      </section>
    </main >
  );
}