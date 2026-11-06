import { applyTranslations, translate } from "./translations.js";
import { generateMatrix, renderSvg } from "./qr-generator.js";
import { buildPayload, InputError } from "./validators.js";

const $ = (selector) => document.querySelector(selector);
const typeDefinitions = [
  { id: "url", key: "typeUrl", icon: "assets/icons/link.svg", fields: [{ name: "url", type: "url", required: true, wide: true }] },
  { id: "text", key: "typeText", icon: "assets/icons/text.svg", fields: [{ name: "text", type: "textarea", required: true, wide: true }] },
  { id: "wifi", key: "typeWifi", icon: "assets/icons/wifi.svg", fields: [
    { name: "ssid", type: "text", required: true, wide: true, hint: "hintSsid" },
    { name: "encryption", type: "select", options: [["WPA", "wpaNetwork"], ["WEP", "wepNetwork"], ["nopass", "openNetwork"]], wide: true },
    { name: "password", type: "password", wide: true, hint: "hintPassword" },
    { name: "hidden", type: "checkbox" }
  ] },
  { id: "contact", key: "typeContact", icon: "assets/icons/contact.svg", fields: [
    { name: "name", type: "text", required: true, wide: true, hint: "hintContact" },
    { name: "phone", type: "tel" }, { name: "email", type: "email" },
    { name: "organization", type: "text" }, { name: "website", type: "url" },
    { name: "address", type: "textarea", wide: true }
  ] },
  { id: "email", key: "typeEmail", icon: "assets/icons/email.svg", fields: [
    { name: "recipient", type: "email", required: true, wide: true },
    { name: "subject", type: "text", wide: true }, { name: "body", type: "textarea", wide: true }
  ] },
  { id: "phone", key: "typePhone", icon: "assets/icons/phone.svg", fields: [{ name: "phone", type: "tel", required: true, wide: true }] },
  { id: "sms", key: "typeSms", icon: "assets/icons/sms.svg", fields: [
    { name: "phone", type: "tel", required: true, wide: true },
    { name: "message", type: "textarea", wide: true }
  ] }
];
const defaultDesign = { foreground: "#172554", background: "#ffffff", transparent: false, dotStyle: "square", cornerStyle: "square", logoData: "", logoName: "", logoSize: 18, logoMargin: 3 };
let type = "url";
let language = "en";
let payload = "";
let svgMarkup = "";
let currentMatrix = null;
let previewUrl = "";
let logoData = "";
let logoName = "";
let lastError = "";
let invalidField = "";

const typeSelector = $("#type-selector");
const contentForm = $("#content-form");
const fieldsContainer = $("#fields");
const preview = $("#qr-preview");
const placeholder = $("#preview-placeholder");
const previewError = $("#preview-error");
const feedback = $("#feedback");
const status = $("#preview-status");
const languageSelect = $("#language");

function t(key) {
  return translate(language, key);
}
payload = "";
svgMarkup = "";
currentMatrix = null;
if (previewUrl) URL.revokeObjectURL(previewUrl);
previewUrl = "";
preview.removeAttribute("src");

function applyLanguage(nextLanguage) {
  language = ["en", "fr", "ar"].includes(nextLanguage) ? nextLanguage : "en";
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  applyTranslations(language);
  document.title = t("pageTitle");
  languageSelect.value = language;
  languageSelect.setAttribute("aria-label", t("language"));
  typeSelector.setAttribute("aria-label", t("contentTitle"));
  $("#theme-toggle").setAttribute("aria-label", t("themeLabel"));
  $("#theme-toggle").title = t("themeLabel");
  preview.alt = t("qrPreviewAlt");
  $("#foreground").setAttribute("aria-label", t("foreground"));
  $("#background").setAttribute("aria-label", t("background"));
  renderTypeSelector();
  renderFields(readValues());
  if (hasEnteredContent()) refresh();
}

function renderTypeSelector() {
  typeSelector.replaceChildren();
  for (const definition of typeDefinitions) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "type-button";
    button.setAttribute("aria-pressed", String(definition.id === type));
    button.setAttribute("aria-label", t(definition.key));
    const icon = document.createElement("img");
    icon.className = "type-icon";
    icon.src = definition.icon;
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = t(definition.key);
    button.append(icon, label);
    button.addEventListener("click", () => {
      if (type === definition.id) return;
      type = definition.id;
      renderTypeSelector();
      renderFields({});
      clearOutput();
    });
    typeSelector.append(button);
  }
}

function readValues() {
  const values = {};
  for (const [key, value] of new FormData(contentForm)) values[key] = value;
  return values;
}

function hasEnteredContent(values = readValues()) {
  const definition = typeDefinitions.find((item) => item.id === type);
  return definition.fields.some((field) =>
    field.type !== "checkbox" && field.type !== "select" && String(values[field.name] ?? "").length > 0
  );
}

function renderFields(values = {}) {
  fieldsContainer.replaceChildren();
  const definition = typeDefinitions.find((item) => item.id === type);
  for (const field of definition.fields) {
    const wrapper = document.createElement("div");
    wrapper.className = `field${field.wide ? " field-wide" : ""}`;
    if (field.type === "checkbox") {
      wrapper.className = "field field-wide";
      const label = document.createElement("label");
      label.className = "checkbox-field";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = field.name;
      input.checked = values[field.name] === "on";
      const text = document.createElement("span");
      text.textContent = t(field.name === "hidden" ? "fieldHidden" : field.name);
      label.append(input, text);
      wrapper.append(label);
      fieldsContainer.append(wrapper);
      continue;
    }

    const label = document.createElement("label");
    label.htmlFor = `field-${field.name}`;
    label.textContent = t(`field${field.name[0].toUpperCase()}${field.name.slice(1)}`);
    const control = field.type === "textarea" ? document.createElement("textarea") : document.createElement(field.type === "select" ? "select" : "input");
    control.id = `field-${field.name}`;
    control.name = field.name;
    if (field.type !== "textarea" && field.type !== "select") control.type = field.type;
    if (["url", "email", "tel", "password"].includes(field.type)) control.dir = "ltr";
    if (field.name === "ssid") control.dir = "auto";
    if (field.required) control.required = true;
    if (field.type === "select") {
      for (const [value, key] of field.options) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = t(key);
        control.append(option);
      }
      control.value = values[field.name] || field.options[0][0];
    } else {
      control.value = values[field.name] ?? "";
      control.autocomplete = "off";
      if (field.type === "textarea") control.rows = field.name === "text" ? 4 : 3;
      if (field.name === "password") control.autocomplete = "new-password";
      if (field.name === "url") control.inputMode = "url";
      if (field.type === "tel") control.inputMode = "tel";
      if (field.type === "email") control.autocomplete = "email";
    }
    control.setAttribute("aria-describedby", `error-${field.name}${field.hint ? ` hint-${field.name}` : ""}`);
    const error = document.createElement("span");
    error.id = `error-${field.name}`;
    error.className = "field-error";
    error.setAttribute("aria-live", "polite");
    const children = [label, control];
    if (field.hint) {
      const hint = document.createElement("span");
      hint.id = `hint-${field.name}`;
      hint.className = "field-hint";
      hint.textContent = t(field.hint);
      children.push(hint);
    }
    children.push(error);
    wrapper.append(...children);
    if (field.name === "password" && values.encryption === "nopass") wrapper.hidden = true;
    fieldsContainer.append(wrapper);
  }
  const privacyHint = document.createElement("div");
  privacyHint.className = "field field-wide";
  privacyHint.id = "sensitive-hint";
  const hint = document.createElement("span");
  hint.className = "field-hint";
  hint.textContent = t("hintSensitive");
  privacyHint.append(hint);
  fieldsContainer.append(privacyHint);
  updateEncryptionFields();
}

function updateEncryptionFields() {
  const encryption = $("#field-encryption");
  const password = $("#field-password");
  if (!encryption || !password) return;
  const wrapper = password.closest(".field");
  wrapper.hidden = encryption.value === "nopass";
  const hint = $("#hint-password");
  if (hint) hint.textContent = t(encryption.value === "WEP" ? "hintWepPassword" : "hintPassword");
}

function setPreviewUrl(svg) {
  const nextUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = nextUrl;
  preview.src = nextUrl;
}

function clearOutput() {
  payload = "";
  svgMarkup = "";
  currentMatrix = null;
  lastError = "";
  invalidField = "";
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = "";
  preview.removeAttribute("src");
  preview.hidden = true;
  placeholder.hidden = false;
  previewError.hidden = true;
  previewError.textContent = "";
  status.textContent = t("waiting");
  $("#download-png").disabled = true;
  $("#download-svg").disabled = true;
  $("#copy-content").disabled = true;
  feedback.textContent = "";
  feedback.classList.remove("error");
}

function showValidationError(error) {
  lastError = error.key || "errorQrCapacity";
  invalidField = error.field || "";
  fieldsContainer.querySelectorAll(".field-error").forEach((node) => { node.textContent = ""; });
  fieldsContainer.querySelectorAll("[aria-invalid='true']").forEach((node) => node.removeAttribute("aria-invalid"));
  if (invalidField) {
    const control = fieldsContainer.querySelector(`[name="${CSS.escape(invalidField)}"]`);
    const errorNode = $(`#error-${CSS.escape(invalidField)}`);
    if (control) control.setAttribute("aria-invalid", "true");
    if (errorNode) errorNode.textContent = t(lastError);
  }
  preview.hidden = true;
  placeholder.hidden = true;
  previewError.textContent = t(lastError);
  previewError.hidden = false;
  status.textContent = t("error");
  $("#download-png").disabled = true;
  $("#download-svg").disabled = true;
  $("#copy-content").disabled = true;
  feedback.textContent = "";
}

function colorLuminance(color) {
  const values = color.match(/\w\w/g).slice(0, 3).map((part) => parseInt(part, 16) / 255).map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function hasLowContrast(foreground, background) {
  const fg = colorLuminance(foreground);
  const bg = colorLuminance(background);
  return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05) < 4.5;
}

function refresh() {
  const values = readValues();
  if (!hasEnteredContent(values)) {
    clearOutput();
    return;
  }
  try {
    const nextPayload = buildPayload(type, values);
    const matrix = generateMatrix(nextPayload, logoData ? "H" : "M");
    currentMatrix = matrix;
    payload = nextPayload;
    svgMarkup = renderSvg(matrix, currentDesign());
    setPreviewUrl(svgMarkup);
    preview.hidden = false;
    placeholder.hidden = true;
    previewError.hidden = true;
    previewError.textContent = "";
    status.textContent = t("ready");
    $("#download-png").disabled = false;
    $("#download-svg").disabled = false;
    $("#copy-content").disabled = false;
    fieldsContainer.querySelectorAll(".field-error").forEach((node) => { node.textContent = ""; });
    fieldsContainer.querySelectorAll("[aria-invalid='true']").forEach((node) => node.removeAttribute("aria-invalid"));
    lastError = "";
    invalidField = "";
    if (hasLowContrast($("#foreground").value, $("#background").value)) {
      feedback.textContent = t("errorContrast");
      feedback.classList.add("error");
      status.textContent = t("warning");
    } else {
      feedback.textContent = "";
      feedback.classList.remove("error");
    }
  } catch (error) {
    const key = error instanceof Error && ["errorQrUnavailable", "errorQrCapacity", "errorQrGeneration"].includes(error.message)
      ? error.message
      : "errorQrGeneration";
    const validationError = error instanceof InputError ? error : new InputError(key);
    showValidationError(validationError);
  }
}

function currentDesign() {
  return {
    foreground: $("#foreground").value,
    background: $("#background").value,
    transparent: $("#transparent").checked,
    dotStyle: $("#dot-style").value,
    cornerStyle: $("#corner-style").value,
    logoData,
    logoSize: Number($("#logo-size").value),
    logoMargin: Number($("#logo-margin").value)
  };
}

function updateColorLabel(input, output) {
  $(output).textContent = input.value.toUpperCase();
}

function updateLogoOutputs() {
  $("#logo-size-output").value = `${$("#logo-size").value}%`;
  $("#logo-margin-output").value = $("#logo-margin").value;
}

function setFeedback(key, isError = false) {
  feedback.textContent = t(key);
  feedback.classList.toggle("error", isError);
}

function downloadBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

function downloadSvg() {
  try {
    if (!currentMatrix) throw new Error();
    const svg = renderSvg(currentMatrix, currentDesign());
    downloadBlob(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), "qr-studio.svg");
    setFeedback("successSvg");
  } catch {
    setFeedback("errorDownload", true);
  }
}

async function downloadPng() {
  try {
    if (!currentMatrix) throw new Error();
    setFeedback("preparingDownload");
    const exportSize = Number($("#export-size").value);
    const pngSource = renderSvg(currentMatrix, { ...currentDesign(), outputSize: exportSize });
    const objectUrl = URL.createObjectURL(new Blob([pngSource], { type: "image/svg+xml;charset=utf-8" }));
    try {
      const image = new Image();
      image.decoding = "async";
      image.src = objectUrl;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = exportSize;
      canvas.height = exportSize;
      const context = canvas.getContext("2d");
      if (!context) throw new Error();
      context.imageSmoothingEnabled = false;
      context.drawImage(image, 0, 0, exportSize, exportSize);
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((result) => result ? resolve(result) : reject(new Error()), "image/png");
      });
      downloadBlob(blob, `qr-studio-${exportSize}.png`);
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
    setFeedback("successPng");
  } catch {
    setFeedback("errorDownload", true);
  }
}

async function copyContent() {
  try {
    if (!payload || !navigator.clipboard?.writeText) throw new Error();
    await navigator.clipboard.writeText(payload);
    setFeedback("successCopy");
  } catch {
    setFeedback("errorCopy", true);
  }
}

async function processLogo(file) {
  if (!file) return;
  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
  const allowedExtensions = /\.(?:png|jpe?g|webp)$/iu.test(file.name);
  if (!allowedTypes.includes(file.type) && !(file.type === "" && allowedExtensions)) {
    setFeedback("errorLogoType", true);
    $("#logo-upload").value = "";
    return;
  }
  if (file.size > 3 * 1024 * 1024) {
    setFeedback("errorLogoSize", true);
    $("#logo-upload").value = "";
    return;
  }
  const objectUrl = URL.createObjectURL(file);
  let image;
  const upload = $("#logo-upload");
  upload.disabled = true;
  setFeedback("processingLogo");
  try {
    if ("createImageBitmap" in window) {
      image = await createImageBitmap(file);
    } else {
      image = new Image();
      image.src = objectUrl;
      await image.decode();
    }
    const width = image.width;
    const height = image.height;
    if (!width || !height || width * height > 40000000) throw new Error();
    const scale = Math.min(1, 512 / Math.max(width, height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error();
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    logoData = canvas.toDataURL("image/png");
    logoName = file.name;
    $("#logo-name").textContent = logoName;
    $("#logo-options").hidden = false;
    refresh();
  } catch {
    setFeedback("errorLogoRead", true);
  } finally {
    if (image && "close" in image && typeof image.close === "function") image.close();
    URL.revokeObjectURL(objectUrl);
    upload.disabled = false;
    upload.value = "";
  }
}

function removeLogo() {
  logoData = "";
  logoName = "";
  $("#logo-name").textContent = t("logoHint");
  $("#logo-options").hidden = true;
  $("#logo-size").value = "18";
  $("#logo-margin").value = "3";
  updateLogoOutputs();
  $("#logo-upload").value = "";
  refresh();
}

contentForm.addEventListener("input", refresh);
contentForm.addEventListener("change", (event) => {
  if (event.target.name === "encryption") {
    const password = $("#field-password");
    updateEncryptionFields();
    if (event.target.value === "nopass" && password) password.value = "";
  }
  refresh();
});
$("#foreground").addEventListener("input", (event) => {
  updateColorLabel(event.target, "#foreground-value");
  refresh();
});
$("#background").addEventListener("input", (event) => {
  updateColorLabel(event.target, "#background-value");
  refresh();
});
$("#transparent").addEventListener("change", refresh);
$("#dot-style").addEventListener("change", refresh);
$("#corner-style").addEventListener("change", refresh);
$("#logo-size").addEventListener("input", () => { updateLogoOutputs(); refresh(); });
$("#logo-margin").addEventListener("input", () => { updateLogoOutputs(); refresh(); });
$("#logo-upload").addEventListener("change", (event) => processLogo(event.target.files?.[0]));
$("#remove-logo").addEventListener("click", removeLogo);
$("#download-svg").addEventListener("click", downloadSvg);
$("#download-png").addEventListener("click", downloadPng);
$("#copy-content").addEventListener("click", copyContent);
$("#reset-design").addEventListener("click", () => {
  $("#foreground").value = defaultDesign.foreground;
  $("#background").value = defaultDesign.background;
  $("#transparent").checked = defaultDesign.transparent;
  $("#dot-style").value = defaultDesign.dotStyle;
  $("#corner-style").value = defaultDesign.cornerStyle;
  $("#logo-size").value = String(defaultDesign.logoSize);
  $("#logo-margin").value = String(defaultDesign.logoMargin);
  updateColorLabel($("#foreground"), "#foreground-value");
  updateColorLabel($("#background"), "#background-value");
  updateLogoOutputs();
  removeLogo();
});
$("#theme-toggle").addEventListener("click", () => {
  const current = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme = current === "dark" ? "light" : "dark";
});
languageSelect.addEventListener("change", (event) => applyLanguage(event.target.value));
window.addEventListener("pagehide", () => {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
});

const themePreference = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
if (themePreference) document.documentElement.dataset.theme = "dark";
renderTypeSelector();
renderFields({});
updateColorLabel($("#foreground"), "#foreground-value");
updateColorLabel($("#background"), "#background-value");
updateLogoOutputs();
applyLanguage("en");
