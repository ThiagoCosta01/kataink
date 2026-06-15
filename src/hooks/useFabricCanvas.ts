import { useEffect, useRef, useState } from "react";
import { Canvas, PencilBrush } from "fabric";

import type { Stroke, Point } from "../types/Stroke";

export function useFabricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);

  const [strokes, setStrokes] = useState<Stroke[]>([]);

  const currentStroke = useRef<Point[]>([]);

  const isDrawing = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: 600,
      height: 600,
      isDrawingMode: true,
    });

    const brush = new PencilBrush(canvas);

    brush.width = 6;

    canvas.freeDrawingBrush = brush;

    const handleMouseDown = (event: any) => {
      isDrawing.current = true;

      currentStroke.current = [];

      const pointer = canvas.getScenePoint(event.e);

      currentStroke.current.push({
        x: pointer.x,
        y: pointer.y,
      });
    };

    const handleMouseMove = (event: any) => {
      if (!isDrawing.current) return;

      const pointer = canvas.getScenePoint(event.e);

      currentStroke.current.push({
        x: pointer.x,
        y: pointer.y,
      });
    };

    const handleMouseUp = () => {
      if (!isDrawing.current) return;

      isDrawing.current = false;

      if (currentStroke.current.length < 2) {
        currentStroke.current = [];
        return;
      }

      setStrokes((previous) => [
        ...previous,
        {
          points: [...currentStroke.current],
        },
      ]);

      currentStroke.current = [];
    };

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);

    setFabricCanvas(canvas);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);

      canvas.dispose();
    };
  }, []);

  const clearCanvas = () => {
    if (!fabricCanvas) return;

    fabricCanvas.clear();

    fabricCanvas.isDrawingMode = true;

    setStrokes([]);
  };

  return {
    canvasRef,
    fabricCanvas,
    strokes,
    clearCanvas,
  };
}