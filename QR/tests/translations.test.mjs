import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { hasTranslation, translationKeys } from "../js/translations.js";

test("all static and directly referenced interface labels are translated", async () => {
  const paths = ["index.html", "privacy.html", "js/app.js", "js/privacy.js"];
  const source = (await Promise.all(paths.map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")))).join("\n");
  const keys = [...source.matchAll(/data-i18n(?:-aria-label)?="([^"]+)"|\bt\("([^"]+)"\)|\btranslate\(language,\s*"([^"]+)"\)/g)]
    .map((match) => match[1] || match[2] || match[3]);
  const uniqueKeys = [...new Set(keys)];
  for (const language of ["en", "fr", "ar"]) {
    const missing = uniqueKeys.filter((key) => !hasTranslation(language, key));
    assert.deepEqual(missing, [], `${language} is missing: ${missing.join(", ")}`);
  }
});

test("English, French, and Arabic provide the same complete translation catalog", () => {
  const english = translationKeys("en");
  assert.ok(english.length > 100);
  assert.deepEqual(translationKeys("fr"), english);
  assert.deepEqual(translationKeys("ar"), english);
});
