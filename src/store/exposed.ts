import { config } from "../config"
import { computed } from "reactive-vscode"
import { duplicate, normRegExpOption } from "../utils"
import { DEFAULT_CAPTURE } from "./constant"

export const captures = computed(() => {
  const raw = config.extension.capture
  const langs = config.extension.languages

  return Object.fromEntries(
    langs.map(lang => [
      lang,
      duplicate((
        raw[lang] ?? raw['default'] ?? DEFAULT_CAPTURE
      ).map(normRegExpOption)),
    ])
  )
})
