import styles from "./RoundScore.module.css";

type Props = {
  open: boolean;
  symbol: string;
  score: number;
  strokeCount: number;
  difficulty: string;
  userDrawing: string;
  onNext: () => void;
};

export default function RoundScore({
  open,
  symbol,
  score,
  strokeCount,
  difficulty,
  userDrawing,
  onNext,
}: Props) {
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

            <div className={styles.reference}>
              {symbol}
            </div>
          </div>

          <div className={styles.card}>
            <h4>Seu desenho</h4>

            <img
              src={userDrawing}
              alt="Desenho do usuário"
              className={styles.drawing}
            />
          </div>
        </div>

        <h2 className={styles.score}>
          {score}/100
        </h2>

        <p className={styles.message}>
          {message}
        </p>

        <div className={styles.info}>
          <span>
            Traços: {strokeCount}
          </span>

          <span>
            {difficulty}
          </span>
        </div>

        <button
          onClick={onNext}
          className={styles.button}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}