import { useState } from "react";

import styles from "./RoundScore.module.css";

import type { Stroke } from "../../../types/Stroke";

type Props = {
  open: boolean;
  symbol: string;
  score: number;
  strokeCount: number;
  difficulty: string;
  userDrawing: string;
  onNext: () => void;

  debugData: {
    template: Stroke[];
    user: Stroke[];
    templateImage: string;
    userImage: string;
  };
};

export default function RoundScore({
  open,
  symbol,
  score,
  strokeCount,
  difficulty,
  userDrawing,
  onNext,
  debugData,
}: Props) {
  const [showDebug, setShowDebug] =
    useState(false);

  if (!open) {
    return null;
  }

  const message =
    score >= 90
      ? "Excelente!"
      : score >= 70
        ? "Muito bom!"
        : score >= 50
          ? "Continue praticando!"
          : "Tente novamente!";

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.topBar}>
          <h2>Resultado</h2>

          <button
            onClick={onNext}
            className={styles.nextButton}
          >
            Próximo →
          </button>
        </div>

        <div className={styles.scoreSection}>
          <div className={styles.scoreCircle}>
            {score}
          </div>

          <h3 className={styles.message}>
            {message}
          </h3>
        </div>

        <div className={styles.info}>
          <span>
            ✍️ {strokeCount} traços
          </span>

          <span>
            📚 {difficulty}
          </span>
        </div>

        <div className={styles.comparison}>
          <div className={styles.card}>
            <h4>Referência</h4>

            <div className={styles.reference}>
              {symbol}
            </div>
          </div>

          <div className={styles.card}>
            <h4>Seu desenho</h4>

            <img
              src={userDrawing}
              className={styles.drawing}
            />
          </div>
        </div>

        <button
          onClick={() =>
            setShowDebug((v) => !v)
          }
          className={styles.debugButton}
        >
          {showDebug
            ? "Ocultar Debug"
            : "Mostrar Debug"}
        </button>

        {showDebug && (
          <div className={styles.debug}>
            <h3>Debug</h3>

            <div className={styles.debugGrid}>
              <div>
                <h4>Template</h4>

                <img
                  src={debugData.templateImage}
                  className={styles.debugImage}
                />
              </div>

              <div>
                <h4>Usuário</h4>

                <img
                  src={debugData.userImage}
                  className={styles.debugImage}
                />
              </div>

              <div>
                <h4>Template (Stroke[])</h4>

                <pre>
                  {JSON.stringify(
                    debugData.template,
                    null,
                    2
                  )}
                </pre>
              </div>

              <div>
                <h4>User (Stroke[])</h4>

                <pre>
                  {JSON.stringify(
                    debugData.user,
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}