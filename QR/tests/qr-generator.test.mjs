import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInThisContext } from "node:vm";

globalThis.window = globalThis;
runInThisContext(readFileSync(new URL("../libraries/qrcode-generator.js", import.meta.url), "utf8"));
runInThisContext(readFileSync(new URL("../libraries/qrcode-generator-utf8.js", import.meta.url), "utf8"));

const { generateMatrix, renderSvg } = await import("../js/qr-generator.js");

test("UTF-8 content generates a square matrix at the requested correction level", () => {
  for (const level of ["M", "H"]) {
    const matrix = generateMatrix("مرحبا — déjà vu & café", level);
    assert.ok(matrix.length >= 21);
    assert.equal(matrix.length, matrix[0].length);
    assert.ok(matrix.some((row) => row.some(Boolean)));
  }
});

test("SVG output preserves a quiet zone and snaps square module edges to pixels", () => {
  const matrix = generateMatrix("scan me");
  const svg = renderSvg(matrix, { foreground: "#172554", background: "#ffffff", dotStyle: "square", cornerStyle: "square", transparent: false });
  assert.match(svg, /width="1000" height="1000" viewBox="0 0 1000 1000"/u);
  assert.match(svg, /<rect width="1000" height="1000" fill="#ffffff"\/>/u);
  assert.doesNotMatch(svg, /<rect x="\d+\.\d/u);
});

test("transparent SVG, circle dots, and embedded logos are rendered locally", () => {
  const matrix = generateMatrix("local logo");
  const svg = renderSvg(matrix, {
    foreground: "#172554",
    background: "#ffffff",
    dotStyle: "circle",
    cornerStyle: "rounded",
    transparent: true,
    logoData: "data:image/png;base64,AAAA",
    logoSize: 14,
    logoMargin: 2,
    outputSize: 256
  });
  assert.match(svg, /width="256" height="256" viewBox="0 0 256 256"/u);
  assert.doesNotMatch(svg, /<rect width="256" height="256" fill="#ffffff"\/>/u);
  assert.match(svg, /<circle /u);
  assert.match(svg, /data:image\/png;base64,AAAA/u);
});

test("QR capacity errors are reported rather than silently truncating data", () => {
  assert.throws(() => generateMatrix("x".repeat(2500)), (error) => error.message === "errorQrCapacity");
});
