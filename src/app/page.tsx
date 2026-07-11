import HandwritingTool from "@/components/HandwritingTool";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HandwritingTool />
      <footer className="mt-auto px-4 pb-8 text-center text-xs text-white/45">
        แรงบันดาลใจจาก saurabhdaware/text-to-handwriting · ฟอนต์ Itim / Sriracha /
        Mali (SIL OFL)
      </footer>
    </main>
  );
}
