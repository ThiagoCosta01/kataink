import styles from "./CanvasBoard.module.css";
import { useFabricCanvas } from "../../../hooks/useFabricCanvas";

export default function CanvasBoard() {
  const {
    canvasRef,
    clearCanvas,
    strokes,
  } = useFabricCanvas();

  const handleConfirm = () => {
    console.log("Traços capturados:");
    console.log(strokes);
  };

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} />

      <div className={styles.actions}>
        <button onClick={clearCanvas}>
          Limpar
        </button>

        <button onClick={handleConfirm}>
          Confirmar
        </button>
      </div>
    </div>
  );
}