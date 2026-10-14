https://kampus-etkinlik-alpha.vercel.app

# Kampüs Etkinlikleri — Sprint 4 (Vite + TypeScript + React)

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, komutlar (`dev`, `build`, `preview`) ve kullanılan paketlerin listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümleri; herkes aynı sürümleri kurar. |
| `node_modules/` | `npm install` ile indirilen paketler; `.gitignore` sayesinde GitHub'a gitmez. |
| `tsconfig*.json` | TypeScript ayarları (uygulama kodu ve Vite ayar dosyası için ayrı ayrı). |
| `vite.config.ts` | Vite ayarları; React eklentisini açar. |
| `index.html` | Tek HTML dosyası; içindeki boş `div#root`'a React çizer. |
| `src/main.tsx` | React'i başlatır, `App`'i `#root`'a çizer (`createRoot`). |
| `src/App.tsx` | Uygulamanın ana bileşeni; 5 sayfanın hepsi burada, açık sayfayı state seçer. |
| `src/App.css` | App'in stilleri; Sprint 3'teki CSS dosyası olduğu gibi buraya taşındı. |
| `src/index.css` | Tüm sayfaya genel stil; bu sprintte boş. |
| `public/` | Olduğu gibi kopyalanan dosyalar (afiş `afis.jpg`, `favicon.svg`). |

Tip, veri ve saf fonksiyonlar ayrı `.ts` dosyalarında: `src/types/campus-event.ts`,
`src/data/events.ts`, `src/utils/filter-events.ts`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build → dist/
npm run preview  # build edilmiş hâli açar
```
