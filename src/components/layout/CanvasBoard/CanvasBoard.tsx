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
    configureBrush(ctx);


  }, []);

  function getPos(
    event: React.PointerEvent<HTMLCanvasElement>
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

  function configureBrush(
    ctx: CanvasRenderingContext2D
  ) {
    ctx.lineWidth = 10;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = "#black";

    ctx.shadowColor =
      "rgba(0,0,0,0.08)";

    ctx.shadowBlur = 4;
  }

  const startDrawing = (
    event: React.PointerEvent<HTMLCanvasElement>
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
    event: React.PointerEvent<HTMLCanvasElement>
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

    const points =
      currentStroke.current.points;

    if (points.length > 0) {
      const last =
        points[points.length - 1];

      const startX =
        last.x * CANVAS_SIZE;

      const startY =
        last.y * CANVAS_SIZE;

      const endX =
        pos.x * CANVAS_SIZE;

      const endY =
        pos.y * CANVAS_SIZE;

      const midX =
        (startX + endX) / 2;

      const midY =
        (startY + endY) / 2;

      const curveStrength = 0;

      const controlX =
        startX +
        (midX - startX) *
        curveStrength;

      const controlY =
        startY +
        (midY - startY) *
        curveStrength;

      ctx.beginPath();

      ctx.moveTo(
        startX,
        startY
      );

      ctx.quadraticCurveTo(
        controlX,
        controlY,
        endX,
        endY
      );

      configureBrush(ctx);

      ctx.stroke();
    }

    points.push(pos);
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

  function getCanvasContext() {
    const canvas = canvasRef.current;

    if (!canvas) {
      return null;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    return {
      canvas,
      ctx,
    };
  }

  const redrawCanvas = (
    remainingStrokes: Stroke[]
  ) => {
    const context =
      getCanvasContext();

    if (!context) {
      return;
    }

    const { ctx } = context;

    ctx.clearRect(
      0,
      0,
      CANVAS_SIZE,
      CANVAS_SIZE
    );

    configureBrush(ctx);

    remainingStrokes.forEach(
      (stroke) => {
        const points =
          stroke.points;

        for (
          let i = 1;
          i < points.length;
          i++
        ) {
          drawCurveSegment(
            ctx,
            points[i - 1],
            points[i]
          );
        }
      }
    );
  };

  function drawCurveSegment(
    ctx: CanvasRenderingContext2D,
    from: {
      x: number;
      y: number;
    },
    to: {
      x: number;
      y: number;
    }
  ) {
    const midX =
      ((from.x + to.x) / 2) *
      CANVAS_SIZE;

    const midY =
      ((from.y + to.y) / 2) *
      CANVAS_SIZE;

    ctx.beginPath();

    ctx.moveTo(
      from.x * CANVAS_SIZE,
      from.y * CANVAS_SIZE
    );

    ctx.quadraticCurveTo(
      from.x * CANVAS_SIZE,
      from.y * CANVAS_SIZE,
      midX,
      midY
    );

    ctx.stroke();
  }

  const clearLastStrokeCanvas = () => {
    if (strokes.length === 0) {
      return;
    }

    const remainingStrokes =
      strokes.slice(0, -1);

    setStrokes(remainingStrokes);

    redrawCanvas(remainingStrokes);
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
          onPointerDown={
            startDrawing
          }
          onPointerMove={draw}
          onPointerUp={
            stopDrawing
          }
          onPointerLeave={
            stopDrawing
          }
        />

        <div className={styles.actions}>
          <button onClick={clearLastStrokeCanvas}>
            Desfazer
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