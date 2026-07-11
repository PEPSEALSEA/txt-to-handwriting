"use client";

import {
  BUNDLED_FONTS,
  type HandwritingSettings,
  type PageEffect,
  type PaperType,
  type Resolution,
} from "@/lib/types";

interface ControlsProps {
  settings: HandwritingSettings;
  onChange: (next: Partial<HandwritingSettings>) => void;
  onFontUpload: (file: File) => void;
  onPaperUpload: (file: File | null) => void;
  onGenerate: () => void;
  generating: boolean;
}

export default function Controls({
  settings,
  onChange,
  onFontUpload,
  onPaperUpload,
  onGenerate,
  generating,
}: ControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="control-field">
        <label htmlFor="font-family">ฟอนต์ลายมือ</label>
        <select
          id="font-family"
          value={settings.fontFamily}
          onChange={(event) => onChange({ fontFamily: event.target.value })}
        >
          {BUNDLED_FONTS.map((font) => (
            <option key={font.id} value={font.id}>
              {font.label}
            </option>
          ))}
          {settings.fontFamily === "UploadedHandwriting" && (
            <option value="UploadedHandwriting">ฟอนต์ที่อัปโหลด</option>
          )}
        </select>
      </div>

      <div className="control-field">
        <label htmlFor="font-file">อัปโหลดฟอนต์ลายมือ (.ttf / .otf)</label>
        <input
          id="font-file"
          type="file"
          accept=".ttf,.otf,font/ttf,font/otf"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onFontUpload(file);
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="control-field">
          <label htmlFor="font-size">ขนาดตัวอักษร ({settings.fontSize}px)</label>
          <input
            id="font-size"
            type="range"
            min={12}
            max={36}
            value={settings.fontSize}
            onChange={(event) =>
              onChange({ fontSize: Number(event.target.value) })
            }
          />
        </div>
        <div className="control-field">
          <label htmlFor="ink-color">สีหมึก</label>
          <input
            id="ink-color"
            type="color"
            value={settings.inkColor}
            onChange={(event) => onChange({ inkColor: event.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="control-field">
          <label htmlFor="letter-spacing">
            ระยะตัวอักษร ({settings.letterSpacing}px)
          </label>
          <input
            id="letter-spacing"
            type="range"
            min={-2}
            max={8}
            step={0.5}
            value={settings.letterSpacing}
            onChange={(event) =>
              onChange({ letterSpacing: Number(event.target.value) })
            }
          />
        </div>
        <div className="control-field">
          <label htmlFor="word-spacing">
            ระยะคำ ({settings.wordSpacing}px)
          </label>
          <input
            id="word-spacing"
            type="range"
            min={0}
            max={16}
            step={0.5}
            value={settings.wordSpacing}
            onChange={(event) =>
              onChange({ wordSpacing: Number(event.target.value) })
            }
          />
        </div>
      </div>

      <div className="control-field">
        <label htmlFor="line-height">
          ระยะบรรทัด ({settings.lineHeight.toFixed(2)})
        </label>
        <input
          id="line-height"
          type="range"
          min={1.2}
          max={2.4}
          step={0.05}
          value={settings.lineHeight}
          onChange={(event) =>
            onChange({ lineHeight: Number(event.target.value) })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="control-field">
          <label htmlFor="top-padding">ขอบบน ({settings.topPadding}px)</label>
          <input
            id="top-padding"
            type="range"
            min={8}
            max={80}
            value={settings.topPadding}
            onChange={(event) =>
              onChange({ topPadding: Number(event.target.value) })
            }
          />
        </div>
        <div className="control-field">
          <label htmlFor="left-padding">ขอบซ้าย ({settings.leftPadding}px)</label>
          <input
            id="left-padding"
            type="range"
            min={16}
            max={100}
            value={settings.leftPadding}
            onChange={(event) =>
              onChange({ leftPadding: Number(event.target.value) })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="control-field">
          <label htmlFor="paper-type">แบบกระดาษ</label>
          <select
            id="paper-type"
            value={settings.paperType}
            onChange={(event) =>
              onChange({ paperType: event.target.value as PaperType })
            }
          >
            <option value="lined">มีเส้น</option>
            <option value="blank">ว่าง</option>
            <option value="grid">ตาราง</option>
          </select>
        </div>
        <div className="control-field">
          <label htmlFor="page-effect">เอฟเฟกต์หน้า</label>
          <select
            id="page-effect"
            value={settings.pageEffect}
            onChange={(event) =>
              onChange({ pageEffect: event.target.value as PageEffect })
            }
          >
            <option value="none">ไม่มี</option>
            <option value="shadows">เงา</option>
            <option value="ink-bleed">หมึกซึม</option>
            <option value="scanner">สแกนเนอร์</option>
          </select>
        </div>
      </div>

      <div className="control-field">
        <label htmlFor="resolution">ความละเอียด</label>
        <select
          id="resolution"
          value={settings.resolution}
          onChange={(event) =>
            onChange({ resolution: event.target.value as Resolution })
          }
        >
          <option value="1">ปกติ (1x)</option>
          <option value="2">คมชัด (2x)</option>
          <option value="3">คมมาก (3x)</option>
        </select>
      </div>

      <div className="control-field">
        <label htmlFor="paper-bg">พื้นหลังกระดาษ (ไม่บังคับ)</label>
        <input
          id="paper-bg"
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            onPaperUpload(file);
          }}
        />
        {settings.paperBackground && (
          <button
            type="button"
            className="btn btn-secondary mt-1"
            onClick={() => onPaperUpload(null)}
          >
            ลบพื้นหลัง
          </button>
        )}
      </div>

      <button
        type="button"
        className="btn btn-primary mt-2 w-full text-base"
        onClick={onGenerate}
        disabled={generating}
      >
        {generating ? "กำลังสร้างภาพ..." : "สร้างภาพลายมือ"}
      </button>
    </div>
  );
}
