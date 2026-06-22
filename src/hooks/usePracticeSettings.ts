import { useState } from "react";

import type { PracticeSettings } from "../types/PracticeSettings";

import { DEFAULT_PRACTICE_SETTINGS } from "../config/UserPracticeSettings";

export function usePracticeSettings() {
  const [settings, setSettings] =
    useState<PracticeSettings>(
      DEFAULT_PRACTICE_SETTINGS
    );

  return {
    settings,
    setSettings,
  };
}