"use client";

import { downloadCanvas } from "@/lib/pdf";

interface OutputGalleryProps {
  images: HTMLCanvasElement[];
  onRemove: (index: number) => void;
  onClear: () => void;
  onDownloadPdf: () => void;
  onMove: (index: number, direction: -1 | 1) => void;
}

export default function OutputGallery({
  images,
  onRemove,
  onClear,
  onDownloadPdf,
  onMove,
}: OutputGalleryProps) {
  if (images.length === 0) {
    return (
      <p className="text-sm text-ink-muted">
        กด &quot;สร้างภาพลายมือ&quot; เพื่อดูผลลัพธ์ที่นี่
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={onDownloadPdf}>
          ดาวน์โหลด PDF
        </button>
        <button type="button" className="btn btn-danger" onClick={onClear}>
          ลบทั้งหมด
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((canvas, index) => (
          <div key={`${index}-${canvas.width}`} className="output-thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={canvas.toDataURL("image/png")} alt={`หน้า ${index + 1}`} />
            <div className="mt-2 flex flex-wrap gap-1">
              <button
                type="button"
                className="btn btn-secondary px-2 py-1 text-xs"
                onClick={() => downloadCanvas(canvas, `handwriting-${index + 1}.png`)}
              >
                ดาวน์โหลด
              </button>
              <button
                type="button"
                className="btn btn-secondary px-2 py-1 text-xs"
                disabled={index === 0}
                onClick={() => onMove(index, -1)}
              >
                ←
              </button>
              <button
                type="button"
                className="btn btn-secondary px-2 py-1 text-xs"
                disabled={index === images.length - 1}
                onClick={() => onMove(index, 1)}
              >
                →
              </button>
              <button
                type="button"
                className="btn btn-danger px-2 py-1 text-xs"
                onClick={() => onRemove(index)}
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
