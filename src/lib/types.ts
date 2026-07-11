export type PageEffect = "none" | "shadows" | "ink-bleed" | "scanner";

export type PaperType = "lined" | "blank" | "grid";

export type Resolution = "1" | "2" | "3";

export interface HandwritingSettings {
  fontFamily: string;
  fontSize: number;
  inkColor: string;
  letterSpacing: number;
  wordSpacing: number;
  lineHeight: number;
  topPadding: number;
  leftPadding: number;
  paperType: PaperType;
  pageEffect: PageEffect;
  resolution: Resolution;
  paperBackground: string | null;
}

export const DEFAULT_SETTINGS: HandwritingSettings = {
  fontFamily: "Itim",
  fontSize: 18,
  inkColor: "#1a1a2e",
  letterSpacing: 0.2,
  wordSpacing: 3,
  lineHeight: 1.8,
  topPadding: 24,
  leftPadding: 36,
  paperType: "lined",
  pageEffect: "none",
  resolution: "2",
  paperBackground: null,
};

export const BUNDLED_FONTS = [
  { id: "Itim", label: "Itim (ลายมือวน)", file: "Itim-Regular.ttf" },
  { id: "Sriracha", label: "Sriracha (ลายมือไม่มีหัว)", file: "Sriracha-Regular.ttf" },
  { id: "Mali", label: "Mali (ลายมือนักเรียน)", file: "Mali-Regular.ttf" },
] as const;

export const DEFAULT_TEXT = `สวัสดีครับ นี่คือตัวอย่างข้อความลายมือภาษาไทย

พิมพ์หรือวางข้อความที่ต้องการแปลงเป็นลายมือได้ที่นี่
ปรับฟอนต์ ขนาดตัวอักษร สีหมึก และเอฟเฟกต์ได้ตามใจชอบ

เมื่อพร้อมแล้วกดปุ่ม "สร้างภาพลายมือ" เพื่อดาวน์โหลดเป็นรูปภาพหรือ PDF`;
