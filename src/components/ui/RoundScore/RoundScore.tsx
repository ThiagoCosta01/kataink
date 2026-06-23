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
  const [showDebug, setShowDebug] = useState(false);

  if (!open) return null;

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
        <h2>Resultado</h2>

        <div className={styles.comparison}>
          <div className={styles.card}>
            <h4>Correto</h4>
            <div className={styles.reference}>{symbol}</div>
          </div>

          <div className={styles.card}>
            <h4>Seu desenho</h4>
            <img
              src={userDrawing}
              className={styles.drawing}
            />
          </div>
        </div>

        <h2 className={styles.score}>{score}/100</h2>
        <p className={styles.message}>{message}</p>

        <div className={styles.info}>
          <span>Traços: {strokeCount}</span>
          <span>{difficulty}</span>
        </div>

        <button
          onClick={() => setShowDebug((v) => !v)}
          className={styles.debugButton}
        >
          {showDebug ? "Ocultar Debug" : "Mostrar Debug"}
        </button>

        {showDebug && (
          <div className={styles.debug}>
            <h3>Debug Completo</h3>

            <div className={styles.debugGrid}>
              {/* 🖼 VISUAL */}
              <div>
                <h4>Template (imagem)</h4>
                <img src={debugData.templateImage} />
              </div>

              <div>
                <h4>User (imagem)</h4>
                <img src={debugData.userImage} />
              </div>

              {/* 🧠 ESTRUTURA REAL */}
              <div>
                <h4>Template (Stroke[])</h4>
                <pre>
                  {JSON.stringify(debugData.template, null, 2)}
                </pre>
              </div>

              <div>
                <h4>User (Stroke[])</h4>
                <pre>
                  {JSON.stringify(debugData.user, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        <button onClick={onNext} className={styles.button}>
          Próximo
        </button>
      </div>
    </div>
  );
}