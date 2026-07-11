import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ลายมือไทย | Text to Handwriting",
  description:
    "แปลงข้อความภาษาไทยเป็นลายมือ พร้อมเอฟเฟกต์หมึกซึม เงา และสแกนเนอร์ ดาวน์โหลดเป็นรูปหรือ PDF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
