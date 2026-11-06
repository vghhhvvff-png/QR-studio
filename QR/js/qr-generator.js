const MAX_BYTES = 2953;

export function generateMatrix(payload, errorCorrectionLevel = "M") {
  if (typeof window.qrcode !== "function") throw new Error("errorQrUnavailable");
  const byteLength = new TextEncoder().encode(payload).length;
  if (byteLength > MAX_BYTES) throw new Error("errorQrCapacity");
  try {
    const code = window.qrcode(0, errorCorrectionLevel);
    code.addData(payload, "Byte");
    code.make();
    const size = code.getModuleCount();
    const matrix = Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, column) => code.isDark(row, column))
    );
    return matrix;
  } catch (error) {
    const message = typeof error === "string" ? error : error instanceof Error ? error.message : "";
    throw new Error(message.includes("code length overflow") ? "errorQrCapacity" : "errorQrGeneration");
  }
}

function isFinderCell(row, column, size) {
  return (row < 7 && column < 7) ||
    (row < 7 && column >= size - 7) ||
    (row >= size - 7 && column < 7);
}

export function renderSvg(matrix, options) {
  const quiet = 4;
  const size = matrix.length;
  const modules = size + quiet * 2;
  const outputSize = Number.isInteger(options.outputSize) ? options.outputSize : 1000;
  const unit = outputSize / modules;
  const foreground = /^#[\da-f]{6}$/iu.test(options.foreground) ? options.foreground : "#172554";
  const background = /^#[\da-f]{6}$/iu.test(options.background) ? options.background : "#ffffff";
  const shapes = [];
  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      if (!matrix[row][column]) continue;
      const x = (column + quiet) * unit;
      const y = (row + quiet) * unit;
      const finder = isFinderCell(row, column, size);
      const style = finder ? options.cornerStyle : options.dotStyle;
      if (style === "circle" && !finder) {
        const radius = Math.max(1, Math.round(unit * 0.49));
        shapes.push(`<circle cx="${Math.round(x + unit / 2)}" cy="${Math.round(y + unit / 2)}" r="${radius}"/>`);
      } else {
        const left = Math.round(x);
        const top = Math.round(y);
        const right = Math.round(x + unit);
        const bottom = Math.round(y + unit);
        const inset = !finder && style === "rounded" ? Math.round(unit * 0.06) : 0;
        const radius = style === "rounded" ? Math.round(unit * 0.18) : 0;
        shapes.push(`<rect x="${left + inset}" y="${top + inset}" width="${right - left - inset * 2}" height="${bottom - top - inset * 2}" rx="${radius}"/>`);
      }
    }
  }
  let logo = "";
  if (options.logoData) {
    const logoSize = Math.min(0.28, Math.max(0.1, options.logoSize / 100)) * outputSize;
    const padding = options.logoMargin * unit;
    const x = (outputSize - logoSize) / 2;
    const y = x;
    const plate = logoSize + padding * 2;
    logo = `<rect x="${(x - padding).toFixed(3)}" y="${(y - padding).toFixed(3)}" width="${plate.toFixed(3)}" height="${plate.toFixed(3)}" rx="${(unit * 0.6).toFixed(3)}" fill="${options.transparent ? "#ffffff" : background}"/><image href="${options.logoData}" x="${x.toFixed(3)}" y="${y.toFixed(3)}" width="${logoSize.toFixed(3)}" height="${logoSize.toFixed(3)}" preserveAspectRatio="xMidYMid meet"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${outputSize}" height="${outputSize}" viewBox="0 0 ${outputSize} ${outputSize}" shape-rendering="geometricPrecision">${options.transparent ? "" : `<rect width="${outputSize}" height="${outputSize}" fill="${background}"/>`}<g fill="${foreground}">${shapes.join("")}</g>${logo}</svg>`;
}
