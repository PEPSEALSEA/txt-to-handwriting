import html2canvas from "html2canvas";
import type { PageEffect, Resolution } from "./types";
import { applyScannerEffect, overlayGradient } from "./effects";

const PAGE_CONTENT_HEIGHT = 514;

export interface GenerateOptions {
  pageEl: HTMLElement;
  contentEl: HTMLElement;
  overlayEl: HTMLElement;
  effect: PageEffect;
  resolution: Resolution;
  text: string;
}

async function capturePage(
  pageEl: HTMLElement,
  effect: PageEffect,
  resolution: Resolution,
): Promise<HTMLCanvasElement> {
  const canvas = await html2canvas(pageEl, {
    scrollX: 0,
    scrollY: -window.scrollY,
    scale: Number(resolution),
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  if (effect === "scanner") {
    applyScannerEffect(canvas);
  }

  return canvas;
}

function applyCaptureStyles(
  pageEl: HTMLElement,
  overlayEl: HTMLElement,
  effect: PageEffect,
): void {
  pageEl.style.border = "none";
  pageEl.style.overflowY = "hidden";
  pageEl.style.filter = "";

  if (effect === "none") {
    overlayEl.className = "paper-overlay";
    overlayEl.style.background = "";
    return;
  }

  if (effect === "ink-bleed") {
    overlayEl.className = "paper-overlay";
    overlayEl.style.background = "";
    pageEl.style.filter = "contrast(1.08) saturate(1.04)";
    pageEl.style.textShadow = "0.4px 0.3px 0.5px rgba(20, 40, 80, 0.28)";
    return;
  }

  overlayEl.className = "paper-overlay shadows";
  overlayEl.style.background = overlayGradient(
    effect === "scanner" ? "scanner" : "shadows",
  );
}

function removeCaptureStyles(
  pageEl: HTMLElement,
  overlayEl: HTMLElement,
): void {
  pageEl.style.overflowY = "auto";
  pageEl.style.border = "";
  pageEl.style.filter = "";
  pageEl.style.textShadow = "";
  overlayEl.className = "paper-overlay";
  overlayEl.style.background = "";
}

function splitTextIntoPages(text: string, contentEl: HTMLElement): string[] {
  contentEl.textContent = text;
  const scrollHeight = contentEl.scrollHeight;
  const totalPages = Math.max(1, Math.ceil(scrollHeight / PAGE_CONTENT_HEIGHT));

  if (totalPages === 1) {
    return [text];
  }

  const tokens = text.split(/(\s+)/);
  const pages: string[] = [];
  let wordCount = 0;

  for (let page = 0; page < totalPages && wordCount < tokens.length; page++) {
    const wordArray: string[] = [];
    let wordString = "";

    while (
      contentEl.scrollHeight <= PAGE_CONTENT_HEIGHT &&
      wordCount < tokens.length
    ) {
      wordString = wordArray.join("");
      wordArray.push(tokens[wordCount]);
      contentEl.textContent = wordArray.join("");
      wordCount++;
    }

    if (wordArray.length > 1 && contentEl.scrollHeight > PAGE_CONTENT_HEIGHT) {
      contentEl.textContent = wordString;
      wordCount--;
    } else {
      wordString = wordArray.join("");
    }

    pages.push(wordString);
    contentEl.textContent = text;
  }

  if (wordCount < tokens.length) {
    pages.push(tokens.slice(wordCount).join(""));
  }

  return pages.filter((page) => page.trim().length > 0);
}

export async function generateImages(
  options: GenerateOptions,
): Promise<HTMLCanvasElement[]> {
  const { pageEl, contentEl, overlayEl, effect, resolution, text } = options;
  const pages = splitTextIntoPages(text, contentEl);
  const images: HTMLCanvasElement[] = [];

  applyCaptureStyles(pageEl, overlayEl, effect);
  pageEl.scrollTo(0, 0);

  try {
    for (const pageText of pages) {
      contentEl.textContent = pageText;
      pageEl.scrollTo(0, 0);
      const canvas = await capturePage(pageEl, effect, resolution);
      images.push(canvas);
    }
  } finally {
    contentEl.textContent = text;
    removeCaptureStyles(pageEl, overlayEl);
  }

  return images;
}
