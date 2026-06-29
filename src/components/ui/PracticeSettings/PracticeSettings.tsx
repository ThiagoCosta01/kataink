import styles from "./PracticeSettings.module.css";

import type { PracticeSettings } from "../../../types/PracticeSettings";

type Props = {
  settings: PracticeSettings;

  onChange: (
    settings: PracticeSettings
  ) => void;
};

export default function PracticeSettings({
  settings,
  onChange,
}: Props) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Opções
      </h3>

      <label className={styles.option}>
        <span>
          Considerar direção dos traços
        </span>

        <input
          className={styles.switch}
          type="checkbox"
          checked={settings.respectStrokeDirection}
          onChange={(event) =>
            onChange({
              ...settings,
              respectStrokeDirection:
                event.target.checked,
            })
          }
        />
      </label>

      <label className={styles.option}>
        <span>
          Exibir guia de desenho
        </span>

        <input
          className={styles.switch}
          type="checkbox"
          checked={settings.showDrawingGuide}
          onChange={(event) =>
            onChange({
              ...settings,
              showDrawingGuide:
                event.target.checked,
            })
          }
        />
      </label>
    </div>
  );
}