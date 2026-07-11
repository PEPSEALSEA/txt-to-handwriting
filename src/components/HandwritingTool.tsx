"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Controls from "@/components/Controls";
import OutputGallery from "@/components/OutputGallery";
import PaperPreview from "@/components/PaperPreview";
import { loadBundledFonts, loadFontFromFile } from "@/lib/fonts";
import { generateImages } from "@/lib/generateImages";
import { createPDF } from "@/lib/pdf";
import {
  DEFAULT_SETTINGS,
  DEFAULT_TEXT,
  type HandwritingSettings,
} from "@/lib/types";

export default function HandwritingTool() {
  const [settings, setSettings] = useState<HandwritingSettings>(DEFAULT_SETTINGS);
  const [text, setText] = useState(DEFAULT_TEXT);
  const [images, setImages] = useState<HTMLCanvasElement[]>([]);
  const [generating, setGenerating] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadBundledFonts()
      .then(() => {
        if (!cancelled) setFontsReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setFontsReady(true);
          setError("โหลดฟอนต์บางตัวไม่สำเร็จ แต่ยังใช้งานต่อได้");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const updateSettings = useCallback((next: Partial<HandwritingSettings>) => {
    setSettings((prev) => ({ ...prev, ...next }));
  }, []);

  const handleFontUpload = useCallback(async (file: File) => {
    try {
      const family = await loadFontFromFile(file);
      setSettings((prev) => ({ ...prev, fontFamily: family }));
      setError(null);
    } catch {
      setError("อัปโหลดฟอนต์ไม่สำเร็จ ลองไฟล์ .ttf หรือ .otf อีกครั้ง");
    }
  }, []);

  const handlePaperUpload = useCallback((file: File | null) => {
    if (!file) {
      setSettings((prev) => {
        if (prev.paperBackground) URL.revokeObjectURL(prev.paperBackground);
        return { ...prev, paperBackground: null };
      });
      return;
    }
    const url = URL.createObjectURL(file);
    setSettings((prev) => {
      if (prev.paperBackground) URL.revokeObjectURL(prev.paperBackground);
      return { ...prev, paperBackground: url };
    });
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!pageRef.current || !contentRef.current || !overlayRef.current) return;
    setGenerating(true);
    setError(null);
    try {
      const currentText = contentRef.current.textContent ?? text;
      const output = await generateImages({
        pageEl: pageRef.current,
        contentEl: contentRef.current,
        overlayEl: overlayRef.current,
        effect: settings.pageEffect,
        resolution: settings.resolution,
        text: currentText,
      });
      setImages(output);
    } catch {
      setError("สร้างภาพไม่สำเร็จ ลองลดความละเอียดหรือข้อความสั้นลง");
    } finally {
      setGenerating(false);
    }
  }, [settings.pageEffect, settings.resolution, text]);

  const handleMove = useCallback((index: number, direction: -1 | 1) => {
    setImages((prev) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= prev.length) return prev;
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.splice(nextIndex, 0, item);
      return copy;
    });
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="brand-display text-4xl leading-tight text-white sm:text-5xl">
          ลายมือไทย
        </p>
        <p className="mt-3 text-base text-white/75 sm:text-lg">
          แปลงข้อความเป็นลายมือ พร้อมเอฟเฟกต์หมึกซึม เงา และสแกนเนอร์
          แล้วดาวน์โหลดเป็นรูปหรือ PDF
        </p>
      </header>

      {!fontsReady ? (
        <p className="text-white/80">กำลังโหลดฟอนต์ลายมือ...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(280px,340px)_1fr]">
          <aside className="rounded-2xl bg-[var(--surface)] p-5 shadow-lg shadow-black/20">
            <Controls
              settings={settings}
              onChange={updateSettings}
              onFontUpload={handleFontUpload}
              onPaperUpload={handlePaperUpload}
              onGenerate={handleGenerate}
              generating={generating}
            />
            {error && (
              <p className="mt-3 text-sm text-[var(--danger)]" role="alert">
                {error}
              </p>
            )}
          </aside>

          <section className="flex flex-col gap-6">
            <div className="rounded-2xl bg-[var(--surface)]/95 p-4 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold tracking-wide text-ink-muted">
                ตัวอย่างกระดาษ — แก้ไขข้อความได้โดยตรง
              </h2>
              <PaperPreview
                initialText={DEFAULT_TEXT}
                onTextChange={setText}
                settings={settings}
                pageRef={pageRef}
                contentRef={contentRef}
                overlayRef={overlayRef}
              />
            </div>

            <div className="rounded-2xl bg-[var(--surface)] p-4 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold tracking-wide text-ink-muted">
                ผลลัพธ์ {images.length > 0 ? `(${images.length})` : ""}
              </h2>
              <OutputGallery
                images={images}
                onRemove={(index) =>
                  setImages((prev) => prev.filter((_, i) => i !== index))
                }
                onClear={() => setImages([])}
                onDownloadPdf={() => createPDF(images)}
                onMove={handleMove}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
