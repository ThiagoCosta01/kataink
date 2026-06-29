import styles from "./GameScore.module.css";

type ScoreItem = {
  round: number;
  score: number;
};

type Props = {
  currentRound: number;
  totalRounds: number;
  totalScore: number;
  averageScore: number;
  scores: ScoreItem[];
  finished: boolean;
};

export default function GameScore({
  currentRound,
  totalRounds,
  totalScore,
  averageScore,
  scores,
  finished,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>
          {finished ? "Sessão finalizada" : "Progresso da sessão"}
        </h2>

        <span>
          Round {Math.min(currentRound, totalRounds)} / {totalRounds}
        </span>
      </div>

      <div className={styles.stats}>
        <div>
          <strong>Total</strong>
          <p>{totalScore}</p>
        </div>

        <div>
          <strong>Média</strong>
          <p>{averageScore}</p>
        </div>
      </div>

      <div className={styles.history}>
        <strong>Histórico</strong>

        <ul>
          {scores.map((s) => (
            <li key={s.round}>
              Round {s.round}: {s.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}