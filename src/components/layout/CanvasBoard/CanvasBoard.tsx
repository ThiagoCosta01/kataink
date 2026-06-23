import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./CanvasBoard.module.css";

import type { Katakana } from "../../../types/Katakana";
import type { Stroke } from "../../../types/Stroke";
import type { PracticeSettings } from "../../../types/PracticeSettings";

import { compareDrawing } from "../../../utils/drawing/compareDrawing";
import { normalizeDrawing } from "../../../utils/drawing/normalize";
import { simplifyDrawing } from "../../../utils/drawing/simplify";
import { resampleDrawing } from "../../../utils/drawing/resample";

import { renderStrokesToImage } from "../../../utils/drawing/renderStrokesToImage";

import { KatakanaComparisonLogger } from "../../../utils/drawing/KatakanaComparisonLogger";

import RoundScore from "../../ui/RoundScore/RoundScore";

const CANVAS_SIZE = 400;

type Props = {
  katakana: Katakana;
  settings: PracticeSettings;
  onScore: (score: number) => void;
  onNext: () => void;
};

export default function CanvasBoard({
  katakana,
  settings,
  onScore,
  onNext,
}: Props) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const currentStroke =
    useRef<Stroke>({
      points: [],
    });

  const [drawing, setDrawing] =
    useState(false);

  const [strokes, setStrokes] =
    useState<Stroke[]>([]);

  const [score, setScore] =
    useState<number | null>(null);

  const [showScore, setShowScore] =
    useState(false);

  const [userDrawing, setUserDrawing] =
    useState("");

  const [debugData, setDebugData] =
    useState({
      user: [] as Stroke[],
      template: [] as Stroke[],
      userImage: "",
      templateImage: "",
    });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;

    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;

    canvas.style.width = `${CANVAS_SIZE}px`;
    canvas.style.height = `${CANVAS_SIZE}px`;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.scale(dpr, dpr);

    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "black";
  }, []);

  function getPos(
    event: React.MouseEvent<HTMLCanvasElement>
  ) {
    const canvas = canvasRef.current!;

    const rect =
      canvas.getBoundingClientRect();

    return {
      x:
        (event.clientX - rect.left) /
        rect.width,

      y:
        (event.clientY - rect.top) /
        rect.height,
    };
  }

  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const pos = getPos(event);

    ctx.beginPath();

    ctx.moveTo(
      pos.x * CANVAS_SIZE,
      pos.y * CANVAS_SIZE
    );

    currentStroke.current = {
      points: [pos],
    };

    setDrawing(true);
  };

  const draw = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    if (!drawing) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const pos = getPos(event);

    ctx.lineTo(
      pos.x * CANVAS_SIZE,
      pos.y * CANVAS_SIZE
    );
    ctx.lineWidth = 10;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "black";

    ctx.stroke();

    currentStroke.current.points.push(
      pos
    );
  };

  const stopDrawing = () => {
    if (!drawing) {
      return;
    }

    setDrawing(false);

    if (
      currentStroke.current.points
        .length > 1
    ) {
      setStrokes((prev) => [
        ...prev,
        currentStroke.current,
      ]);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    setStrokes([]);

    currentStroke.current = {
      points: [],
    };
  };

  const redrawCanvas = (
    remainingStrokes: Stroke[]
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.clearRect(
      0,
      0,
      CANVAS_SIZE,
      CANVAS_SIZE
    );

    remainingStrokes.forEach((stroke) => {
      if (stroke.points.length < 2) {
        return;
      }

      ctx.beginPath();

      ctx.moveTo(
        stroke.points[0].x *
        CANVAS_SIZE,
        stroke.points[0].y *
        CANVAS_SIZE
      );

      for (
        let i = 1;
        i < stroke.points.length;
        i++
      ) {
        ctx.lineTo(
          stroke.points[i].x *
          CANVAS_SIZE,
          stroke.points[i].y *
          CANVAS_SIZE
        );
      }

      ctx.stroke();
    });
  };

  const clearLastStrokeCanvas = () => {
    if (strokes.length === 0) {
      return;
    }

    const remainingStrokes =
      strokes.slice(0, -1);

    setStrokes(remainingStrokes);

    redrawCanvas(remainingStrokes);
  };

  const undo = () => {
  setStrokes((prev) => {
    const next = prev.slice(0, -1);

    redrawCanvas(next);

    return next;
  });
};

  const handleConfirm = () => {
    const template =
      katakana.template;

    if (
      !template ||
      template.length === 0
    ) {
      alert(
        "Este katakana ainda não possui template."
      );

      return;
    }

    const processedUser =
      resampleDrawing(
        normalizeDrawing(
          simplifyDrawing(strokes)
        ),
        32
      );

    const processedTemplate =
      resampleDrawing(
        normalizeDrawing(template),
        32
      );

    const similarity =
      compareDrawing(
        processedUser,
        processedTemplate,
        settings.respectStrokeDirection
      );

    const finalScore =
      Math.round(
        similarity * 100
      );

    setScore(finalScore);

    onScore(finalScore);

    setUserDrawing(
      canvasRef.current?.toDataURL(
        "image/png"
      ) || ""
    );

    setDebugData({
      user: processedUser,
      template: processedTemplate,

      userImage:
        renderStrokesToImage(
          processedUser
        ),

      templateImage:
        renderStrokesToImage(
          processedTemplate
        ),
    });

    KatakanaComparisonLogger.log({
      symbol: katakana.symbol,

      score: finalScore,

      user: processedUser,

      template:
        processedTemplate,
    });

    setShowScore(true);
  };

  return (
    <>
      <div className={styles.container}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onMouseDown={
            startDrawing
          }
          onMouseMove={draw}
          onMouseUp={
            stopDrawing
          }
          onMouseLeave={
            stopDrawing
          }
        />

        <div className={styles.actions}>
          <button onClick={clearLastStrokeCanvas}>
            Último traço
          </button>
          <button onClick={clearCanvas}>
            Limpar
          </button>

          <button onClick={handleConfirm}>
            Confirmar
          </button>
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
        debugData={debugData}
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