import CanvasBoard from "../../components/layout/CanvasBoard/CanvasBoard";

export default function Practice() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f5f7fb",
      }}
    >
      <div>
        <h1>Escreva:</h1>

        <h2
          style={{
            fontSize: "6rem",
            textAlign: "center",
          }}
        >
          シ
        </h2>

        <CanvasBoard />
      </div>
    </main>
  );
}