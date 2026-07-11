# ลายมือไทย — Text to Handwriting

แปลงข้อความภาษาไทยเป็นลายมือ ดาวน์โหลดเป็นรูปภาพหรือ PDF

**Demo (หลังเปิด GitHub Pages):** https://pepsealsea.github.io/txt-to-handwriting/

## ฟีเจอร์

- ฟอนต์ลายมือไทย bundled: Itim, Sriracha, Mali (SIL OFL)
- อัปโหลดฟอนต์ `.ttf` / `.otf` ของคุณเอง
- ปรับขนาด ระยะตัวอักษร/คำ ระยะบรรทัด สีหมึก
- เอฟเฟกต์: เงา, หมึกซึม, สแกนเนอร์
- สร้างหลายหน้า + ดาวน์โหลด PNG / PDF

## พัฒนาโลคอล

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

## Build static

```bash
npm run build
```

ผลลัพธ์อยู่ที่โฟลเดอร์ `out/`

สำหรับ GitHub Pages:

```bash
GITHUB_PAGES=true npm run build
```

## Deploy

Push ไป `main` แล้ว GitHub Actions จะ build + deploy ไป GitHub Pages อัตโนมัติ

ตั้งค่า repo: **Settings → Pages → Source = GitHub Actions**

## Stack

- Next.js (static export)
- html2canvas
- jsPDF

แรงบันดาลใจจาก [saurabhdaware/text-to-handwriting](https://github.com/saurabhdaware/text-to-handwriting)
