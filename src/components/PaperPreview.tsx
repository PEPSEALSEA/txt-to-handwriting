"use client";

import { useEffect, type CSSProperties, type RefObject } from "react";
import type { HandwritingSettings } from "@/lib/types";

interface PaperPreviewProps {
  initialText: string;
  onTextChange: (value: string) => void;
  settings: HandwritingSettings;
  pageRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
}

export default function PaperPreview({
  initialText,
  onTextChange,
  settings,
  pageRef,
  contentRef,
  overlayRef,
}: PaperPreviewProps) {
  useEffect(() => {
    if (contentRef.current && !contentRef.current.dataset.ready) {
      contentRef.current.textContent = initialText;
      contentRef.current.dataset.ready = "1";
      onTextChange(initialText);
    }
  }, [contentRef, initialText, onTextChange]);

  return (
    <div className="page-container overflow-x-auto pb-2">
      <div
        ref={pageRef}
        className={`paper-page ${settings.paperType}`}
        style={
          {
            "--handwriting-font": settings.fontFamily,
            "--font-size": `${settings.fontSize}px`,
            "--letter-spacing": `${settings.letterSpacing}px`,
            "--word-spacing": `${settings.wordSpacing}px`,
            "--line-height": String(settings.lineHeight),
            "--top-padding": `${settings.topPadding}px`,
            "--left-padding": `${settings.leftPadding}px`,
            "--ink-color": settings.inkColor,
            backgroundImage: settings.paperBackground
              ? `url(${settings.paperBackground})`
              : undefined,
            backgroundSize: settings.paperBackground ? "cover" : undefined,
          } as CSSProperties
        }
      >
        <div className="paper-margins" aria-hidden />
        <div
          ref={contentRef}
          className="paper-content"
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          onInput={(event) =>
            onTextChange(event.currentTarget.textContent ?? "")
          }
          onPaste={(event) => {
            event.preventDefault();
            const pasted = event.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, pasted);
          }}
        />
        <div ref={overlayRef} className="paper-overlay" />
      </div>
    </div>
  );
}
