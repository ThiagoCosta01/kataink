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
        Configurações
      </h3>

      <label className={styles.option}>
        <input
          type="checkbox"
          checked={
            settings.respectStrokeDirection
          }
          onChange={(event) =>
            onChange({
              ...settings,
              respectStrokeDirection:
                event.target.checked,
            })
          }
        />

        Considerar direção dos traços
      </label>
    </div>
  );
}