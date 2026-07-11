export function contrastImage(
  imageData: ImageData,
  contrast: number,
): ImageData {
  const data = imageData.data;
  const scaled = contrast * 255;
  const factor = (scaled + 255) / (255.01 - scaled);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = factor * (data[i] - 128) + 128;
    data[i + 1] = factor * (data[i + 1] - 128) + 128;
    data[i + 2] = factor * (data[i + 2] - 128) + 128;
  }
  return imageData;
}

export function applyScannerEffect(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext("2d");
  if (!context) return;
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  contrastImage(imageData, 0.55);
  context.putImageData(imageData, 0, 0);
}

export function overlayGradient(effect: "shadows" | "scanner"): string {
  if (effect === "scanner") {
    const deg = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
    return `linear-gradient(${deg}deg, #0008, #0000)`;
  }
  return `linear-gradient(${Math.random() * 360}deg, #0008, #0000)`;
}
