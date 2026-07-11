import { BUNDLED_FONTS } from "./types";
import { assetUrl } from "./assets";

export async function loadBundledFonts(): Promise<void> {
  if (typeof document === "undefined") return;

  await Promise.all(
    BUNDLED_FONTS.map(async (font) => {
      const face = new FontFace(
        font.id,
        `url(${assetUrl(`/fonts/${font.file}`)})`,
      );
      const loaded = await face.load();
      document.fonts.add(loaded);
    }),
  );
}

export async function loadFontFromFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const family = "UploadedHandwriting";
  const face = new FontFace(family, buffer);
  const loaded = await face.load();
  document.fonts.add(loaded);
  return family;
}
