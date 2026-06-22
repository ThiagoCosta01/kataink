import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./CanvasBoard.module.css";

import type { Katakana } from "../../../types/Katakana";

import { compareKatakana } from "../../../utils/compareKatakana";

import RoundScore from "../RoundScore/RoundScore";

type Props = {
  katakana: Katakana;
  onNext: () => void;
};

export default function CanvasBoard({
  katakana,
  onNext,
}: Props) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const [drawing, setDrawing] =
    useState(false);

  const [score, setScore] =
    useState<number | null>(null);

  const [showScore, setShowScore] =
    useState(false);

  const [userDrawing, setUserDrawing] =
    useState("");

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "black";
  }, []);

  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const rect =
      canvas.getBoundingClientRect();

    ctx.beginPath();

    ctx.moveTo(
      event.clientX - rect.left,
      event.clientY - rect.top
    );

    setDrawing(true);
  };

  const draw = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    if (!drawing) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const rect =
      canvas.getBoundingClientRect();

    ctx.lineTo(
      event.clientX - rect.left,
      event.clientY - rect.top
    );

    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  };

  const handleConfirm = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const result = compareKatakana(
      canvas,
      katakana.symbol
    );

    setUserDrawing(
      canvas.toDataURL("image/png")
    );

    setScore(result.score);

    setShowScore(true);
  };

  return (
    <>
      <div className={styles.container}>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className={styles.canvas}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />

        <div className={styles.actions}>
          <button onClick={clearCanvas}>
            Limpar
          </button>

          <button onClick={handleConfirm}>
            Confirmar
          </button>
        </div>

        <div className={styles.info}>
          <p>
            Traços: {katakana.strokeCount}
          </p>

          <p>
            Dificuldade:{" "}
            {katakana.difficulty}
          </p>
        </div>
      </div>

      <RoundScore
        open={showScore}
        symbol={katakana.symbol}
        score={score ?? 0}
        strokeCount={
          katakana.strokeCount
        }
        difficulty={
          katakana.difficulty
        }
        userDrawing={userDrawing}
        onNext={() => {
          setShowScore(false);

          clearCanvas();

          setScore(null);

          onNext();
        }}
      />
    </>
  );
}