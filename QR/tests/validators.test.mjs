import test from "node:test";
import assert from "node:assert/strict";
import { buildPayload, InputError } from "../js/validators.js";

test("website links normalize hostnames and preserve URL query characters", () => {
  assert.equal(buildPayload("url", { url: "example.com/path?q=a&x=é" }), "https://example.com/path?q=a&x=é");
  assert.throws(() => buildPayload("url", { url: "https://bad host/" }), (error) => error.key === "errorUrl");
});

test("plain text preserves Arabic, French accents, and punctuation", () => {
  const text = "مرحبا — déjà vu ! & = %";
  assert.equal(buildPayload("text", { text }), text);
});

test("Wi-Fi payload escapes delimiters and formats hidden WPA networks", () => {
  const payload = buildPayload("wifi", {
    ssid: "Café; réseau",
    password: "p@ssword;\\x",
    encryption: "WPA",
    hidden: "on"
  });
  assert.equal(payload, "WIFI:T:WPA;S:Café\\; réseau;P:p@ssword\\;\\\\x;H:true;;");
});

test("open Wi-Fi networks omit password data", () => {
  assert.equal(buildPayload("wifi", { ssid: "Guest", encryption: "nopass" }), "WIFI:T:nopass;S:Guest;H:false;;");
});

test("Wi-Fi enforces SSID byte length and password format", () => {
  assert.throws(() => buildPayload("wifi", { ssid: "界".repeat(11), encryption: "nopass" }), (error) => error.key === "errorSsid");
  assert.throws(() => buildPayload("wifi", { ssid: "Office", password: "short", encryption: "WPA" }), (error) => error.key === "errorWpa");
  assert.throws(() => buildPayload("wifi", { ssid: "Office", password: "", encryption: "WPA" }), (error) => error.key === "errorRequired");
  assert.equal(buildPayload("wifi", { ssid: "Office", password: "abcde", encryption: "WEP" }), "WIFI:T:WEP;S:Office;P:abcde;H:false;;");
  assert.throws(() => buildPayload("wifi", { ssid: "Office", password: "ééééé", encryption: "WEP" }), (error) => error.key === "errorWep");
});

test("vCard includes optional details and escapes user-provided punctuation", () => {
  const payload = buildPayload("contact", {
    name: "Zoë O'Neil",
    phone: "+33 (0)6 12 34 56 78",
    email: "zoe@example.fr",
    organization: "Équipe; labo",
    website: "https://exemple.fr/contact",
    address: "12 rue, Paris\nFrance"
  });
  assert.match(payload, /FN:Zoë O'Neil/u);
  assert.match(payload, /N:O'Neil;Zoë;;;/u);
  assert.match(payload, /TEL;TYPE=CELL:\+330612345678/u);
  assert.match(payload, /ORG:Équipe\\; labo/u);
  assert.match(payload, /ADR;TYPE=WORK:;;12 rue\\, Paris\\nFrance;;;;/u);
  assert.ok(payload.endsWith("END:VCARD"));
});

test("email links percent-encode subject and body", () => {
  assert.equal(
    buildPayload("email", { recipient: "bonjour@example.fr", subject: "Café & thé", body: "Salut\nà bientôt!" }),
    "mailto:bonjour@example.fr?subject=Caf%C3%A9+%26+th%C3%A9&body=Salut%0A%C3%A0+bient%C3%B4t%21"
  );
  assert.throws(() => buildPayload("email", { recipient: "not-an-address" }), (error) => error.key === "errorEmail");
});

test("phone and SMS schemes preserve international numbers and message content", () => {
  assert.equal(buildPayload("phone", { phone: "+1 (415) 555-0134" }), "tel:+14155550134");
  assert.equal(buildPayload("sms", { phone: "+33 6 12 34 56 78", message: "Bonjour, 世界!" }), "SMSTO:+33612345678:Bonjour, 世界!");
});

test("required fields and excessive lengths return actionable validation errors", () => {
  assert.throws(() => buildPayload("text", { text: "  " }), (error) => error instanceof InputError && error.key === "errorRequired");
  assert.throws(() => buildPayload("text", { text: "x".repeat(3001) }), (error) => error.key === "errorTooLong");
});
