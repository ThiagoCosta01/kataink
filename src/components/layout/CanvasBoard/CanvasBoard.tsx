import { useEffect, useRef, useState } from "react";

import styles from "./CanvasBoard.module.css";

import type { Katakana } from "../../../types/Katakana";
import type { Stroke } from "../../../types/Stroke";

import { compareDrawing } from "../../../utils/drawing/compareDrawing";
import { normalizeDrawing } from "../../../utils/drawing/normalize";
import { simplifyDrawing } from "../../../utils/drawing/simplify";

import { KatakanaComparisonLogger } from "../../../utils/drawing/KatakanaComparisonLogger";
import { renderStrokesToImage } from "../../../utils/drawing/renderStrokesToImage";

import RoundScore from "../RoundScore/RoundScore";

type DebugData = {
  template: Stroke[];
  user: Stroke[];
  templateImage: string;
  userImage: string;
} | null;

type Props = {
  katakana: Katakana;
  onNext: () => void;
};

export default function CanvasBoard({
  katakana,
  onNext,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [drawing, setDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentStroke = useRef<Stroke>({ points: [] });

  const [score, setScore] = useState<number | null>(null);
  const [showScore, setShowScore] = useState(false);

  const [userDrawing, setUserDrawing] = useState("");

  const [debugData, setDebugData] = useState<DebugData>(null);

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

  function getPos(event: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    return {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
  }

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(event);

    ctx.beginPath();
    ctx.moveTo(pos.x * canvas.width, pos.y * canvas.height);

    currentStroke.current = {
      points: [pos],
    };

    setDrawing(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(event);

    ctx.lineTo(pos.x * canvas.width, pos.y * canvas.height);
    ctx.stroke();

    currentStroke.current.points.push(pos);
  };

  const stopDrawing = () => {
    if (!drawing) return;

    setDrawing(false);

    setStrokes((prev) => [...prev, currentStroke.current]);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setStrokes([]);
    currentStroke.current = { points: [] };
  };

  const handleConfirm = () => {
    const template = katakana.template;

    const processedUser = normalizeDrawing(
      simplifyDrawing(strokes)
    );

    const result = compareDrawing(processedUser, template);
    const finalScore = Math.round(result * 100);

    setScore(finalScore);

    setUserDrawing(
      canvasRef.current?.toDataURL("image/png") || ""
    );

    KatakanaComparisonLogger.log({
      symbol: katakana.symbol,
      user: processedUser,
      template,
      score: finalScore,
    });

    setDebugData({
      template,
      user: processedUser,
      templateImage: renderStrokesToImage(template),
      userImage: renderStrokesToImage(processedUser),
    });

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
          <button onClick={clearCanvas}>Limpar</button>
          <button onClick={handleConfirm}>Confirmar</button>
        </div>

        <div className={styles.info}>
          <p>Traços: {katakana.strokeCount}</p>
          <p>Dificuldade: {katakana.difficulty}</p>
        </div>
      </div>

      <RoundScore
        open={showScore}
        symbol={katakana.symbol}
        score={score ?? 0}
        strokeCount={katakana.strokeCount}
        difficulty={katakana.difficulty}
        userDrawing={userDrawing}
        debugData={
          debugData ?? {
            template: [],
            user: [],
            templateImage: "",
            userImage: "",
          }
        }
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