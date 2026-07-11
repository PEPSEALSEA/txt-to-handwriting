import { jsPDF } from "jspdf";

export function createPDF(images: HTMLCanvasElement[]): void {
  const doc = new jsPDF("p", "pt", "a4");
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  images.forEach((canvas, index) => {
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    doc.addImage(dataUrl, "JPEG", 25, 50, width - 50, height - 80);
    if (index < images.length - 1) {
      doc.addPage();
    }
  });

  doc.save("handwriting.pdf");
}

export function downloadCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
