import { applyTranslations, translate } from "./translations.js";

const languageSelect = document.querySelector("#language");
let language = "en";

function setLanguage(nextLanguage) {
  language = ["en", "fr", "ar"].includes(nextLanguage) ? nextLanguage : "en";
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  applyTranslations(language);
  document.title = translate(language, "privacyPageDocumentTitle");
  languageSelect.value = language;
  languageSelect.setAttribute("aria-label", translate(language, "language"));
  const themeToggle = document.querySelector("#theme-toggle");
  themeToggle.setAttribute("aria-label", translate(language, "themeLabel"));
  themeToggle.title = translate(language, "themeLabel");
}

languageSelect.addEventListener("change", (event) => setLanguage(event.target.value));
document.querySelector("#theme-toggle").addEventListener("click", () => {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
});
if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) document.documentElement.dataset.theme = "dark";
setLanguage(language);
