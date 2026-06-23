import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1>Sobre o Kataink</h1>

        <p>
          O Kataink é uma aplicação web desenvolvida para auxiliar no
          aprendizado da escrita do alfabeto Katakana da língua japonesa.
        </p>

        <p>
          A plataforma permite que estudantes pratiquem a escrita dos
          caracteres diretamente na tela, recebendo uma avaliação baseada na
          semelhança entre o caractere desenhado e o modelo esperado.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Objetivo</h2>

        <p>
          O principal objetivo do projeto é fornecer uma ferramenta interativa
          para reforçar a memorização e a prática da escrita de Katakana,
          tornando o processo de aprendizagem mais acessível e envolvente.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Funcionalidades</h2>

        <ul>
          <li>Prática de escrita de caracteres Katakana.</li>
          <li>Canvas para desenho livre.</li>
          <li>Avaliação automática da escrita.</li>
          <li>Feedback visual da pontuação obtida.</li>
          <li>Acompanhamento do desempenho durante as sessões.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Principais Tecnologias Utilizadas</h2>

        <ul>
          <li>React</li>
          <li>TypeScript</li>
          <li>Vite</li>
          <li>HTML5 Canvas</li>
          <li>CSS Modules</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Informações Acadêmicas</h2>

        <div className={styles.info}>
          <div>
            <strong>Projeto:</strong>
            <span>Kataink</span>
          </div>

          <div>
            <strong>Autor:</strong>
            <span>Thiago Lucas Silveira Costa</span>
          </div>

          <div>
            <strong>Curso:</strong>
            <span>Análise e Desenvolvimento de Sistemas - Uninter</span>
          </div>

          <div>
            <strong>Ano:</strong>
            <span>2026</span>
          </div>
        </div>
      </section>
    </main>
  );
}