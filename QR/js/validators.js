const MAX_FIELD_LENGTH = 3000;
const encoder = new TextEncoder();

export class InputError extends Error {
  constructor(key, field) {
    super(key);
    this.key = key;
    this.field = field;
  }
}

function assertLength(value, field) {
  if (value.length > MAX_FIELD_LENGTH) throw new InputError("errorTooLong", field);
}

function required(value, field) {
  if (!value.trim()) throw new InputError("errorRequired", field);
  assertLength(value, field);
  return value.trim();
}

function optional(value, field) {
  assertLength(value, field);
  return value.trim();
}

function email(value, field) {
  const result = required(value, field);
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/u.test(result)) throw new InputError("errorEmail", field);
  return result;
}

function phone(value, field) {
  const result = required(value, field);
  const normalized = result.replace(/[().\s-]/gu, "");
  if (!/^\+?\d{3,30}$/u.test(normalized)) {
    throw new InputError("errorPhone", field);
  }
  return normalized;
}

function wifiEscape(value) {
  return value.replace(/([\\;,:"])/gu, "\\$1");
}

function vcardEscape(value) {
  return value.replace(/\\/gu, "\\\\").replace(/\r\n|\r|\n/gu, "\\n").replace(/([,;])/gu, "\\$1");
}

function website(value, field) {
  let result = required(value, field);
  if (!/^[a-z][a-z\d+.-]*:\/\//iu.test(result)) result = `https://${result}`;
  try {
    const parsed = new URL(result);
    if (!["http:", "https:"].includes(parsed.protocol) || !parsed.hostname || /\s/u.test(result)) throw new Error();
  } catch {
    throw new InputError("errorUrl", field);
  }
  return result;
}

export function buildPayload(type, values) {
  switch (type) {
    case "url":
      return website(values.url ?? "", "url");
    case "text":
      return required(values.text ?? "", "text");
    case "wifi": {
      const ssid = required(values.ssid ?? "", "ssid");
      if (encoder.encode(ssid).length > 32) throw new InputError("errorSsid", "ssid");
      const encryption = values.encryption || "WPA";
      const password = optional(values.password ?? "", "password");
      if (encryption === "WPA" && password && !(password.length >= 8 && password.length <= 63 || /^[\da-f]{64}$/iu.test(password))) {
        throw new InputError("errorWpa", "password");
      }
      const passwordBytes = encoder.encode(password).length;
      if (encryption === "WEP" && password && !([5, 13].includes(passwordBytes) || /^(?:[\da-f]{10}|[\da-f]{26})$/iu.test(password))) {
        throw new InputError("errorWep", "password");
      }
      if (encryption !== "nopass" && !password) throw new InputError("errorRequired", "password");
      return `WIFI:T:${encryption === "nopass" ? "nopass" : encryption};S:${wifiEscape(ssid)};${encryption === "nopass" ? "" : `P:${wifiEscape(password)};`}H:${values.hidden === "on" ? "true" : "false"};;`;
    }
    case "contact": {
      const name = required(values.name ?? "", "name");
      const phoneValue = optional(values.phone ?? "", "phone");
      const emailValue = optional(values.email ?? "", "email");
      const organization = optional(values.organization ?? "", "organization");
      const websiteValue = optional(values.website ?? "", "website");
      const address = optional(values.address ?? "", "address");
      const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${vcardEscape(name)}`];
      const nameParts = name.split(/\s+/u);
      lines.push(`N:${vcardEscape(nameParts.slice(1).join(" "))};${vcardEscape(nameParts[0])};;;`);
      if (phoneValue) lines.push(`TEL;TYPE=CELL:${phone(phoneValue, "phone")}`);
      if (emailValue) lines.push(`EMAIL:${email(emailValue, "email")}`);
      if (organization) lines.push(`ORG:${vcardEscape(organization)}`);
      if (websiteValue) lines.push(`URL:${website(websiteValue, "website")}`);
      if (address) lines.push(`ADR;TYPE=WORK:;;${vcardEscape(address)};;;;`);
      lines.push("END:VCARD");
      return lines.join("\r\n");
    }
    case "email": {
      const recipient = email(values.recipient ?? "", "recipient");
      const subject = optional(values.subject ?? "", "subject");
      const body = optional(values.body ?? "", "body");
      const params = new URLSearchParams();
      if (subject) params.set("subject", subject);
      if (body) params.set("body", body);
      const query = params.toString();
      return `mailto:${recipient}${query ? `?${query}` : ""}`;
    }
    case "phone":
      return `tel:${phone(values.phone ?? "", "phone")}`;
    case "sms": {
      const number = phone(values.phone ?? "", "phone");
      const message = optional(values.message ?? "", "message");
      return `SMSTO:${number}:${message}`;
    }
    default:
      throw new InputError("errorQrUnavailable");
  }
}
