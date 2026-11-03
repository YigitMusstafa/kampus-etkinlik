https://mustafayigitemet-frontend.vercel.app

# Kampüs Etkinlikleri — frontend (Vite + TypeScript + React)

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, komutlar (`dev`, `build`, `preview`) ve kullanılan paketlerin listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümleri; herkes aynı sürümleri kurar. |
| `node_modules/` | `npm install` ile indirilen paketler; `.gitignore` sayesinde GitHub'a gitmez. |
| `tsconfig*.json` | TypeScript ayarları (uygulama kodu ve Vite ayar dosyası için ayrı ayrı). |
| `vite.config.ts` | Vite ayarları; React eklentisini açar. |
| `vercel.json` | Vercel'de her adresi `index.html`'e yönlendirir; sayfa yenilenince 404 vermez. |
| `index.html` | Tek HTML dosyası; içindeki boş `div#root`'a React çizer. |
| `src/main.tsx` | React'i başlatır; `App`'i `BrowserRouter` ve `EventsProvider` ile sarıp `#root`'a çizer. |
| `src/App.tsx` | Uygulamanın kabuğu: Header, Navigation, Routes ve Footer; state yok, açık sayfayı adres seçer. |
| `src/App.css` | App'in stilleri; Sprint 3'teki CSS dosyası olduğu gibi buraya taşındı. |
| `src/index.css` | Tüm sayfaya genel stil; boş. |
| `public/` | Olduğu gibi kopyalanan dosyalar (afiş `afis.jpg`, `favicon.svg`). |

Sayfalar `src/pages/` (10 sayfa), ortak etkinlik listesi `src/context/EventsContext.tsx`,
bileşenler `src/components/` içinde. Tip, veri ve saf fonksiyonlar ayrı `.ts` dosyalarında:
`src/types/campus-event.ts`, `src/data/events.ts`, `src/utils/filter-events.ts`,
`src/utils/format-date.ts`, `src/utils/validate-event.ts`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build → dist/
npm run preview  # build edilmiş hâli açar
```
