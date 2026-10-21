https://kampus-etkinlik-alpha.vercel.app

# Kampüs Etkinlikleri — Sprint 5 (React bileşenleri)

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, komutlar (`dev`, `build`, `preview`) ve kullanılan paketlerin listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümleri; herkes aynı sürümleri kurar. |
| `node_modules/` | `npm install` ile indirilen paketler; `.gitignore` sayesinde GitHub'a gitmez. |
| `tsconfig*.json` | TypeScript ayarları (uygulama kodu ve Vite ayar dosyası için ayrı ayrı). |
| `vite.config.ts` | Vite ayarları; React eklentisini açar. |
| `index.html` | Tek HTML dosyası; içindeki boş `div#root`'a React çizer. |
| `src/main.tsx` | React'i başlatır, `App`'i `#root`'a çizer (`createRoot`). |
| `src/App.tsx` | Ana bileşen: state'ler, hesaplanan değerler ve `go()`; sayfaları bileşenlerden kurar (Sprint 4'te 309, şimdi 108 satır). |
| `src/components/` | Her parça kendi dosyasında bir bileşen; veriyi props ile alır, olayları callback ile App'e bildirir. |
| `src/App.css` | App'in stilleri; Sprint 3'teki CSS dosyası olduğu gibi buraya taşındı. |
| `src/index.css` | Tüm sayfaya genel stil; bu sprintte boş. |
| `public/` | Olduğu gibi kopyalanan dosyalar (afiş `afis.jpg`, `favicon.svg`). |

Tip, veri ve saf fonksiyonlar ayrı `.ts` dosyalarında: `src/types/campus-event.ts`,
`src/types/page.ts`, `src/data/events.ts`, `src/utils/filter-events.ts`, `src/utils/format-date.ts`.

## Bileşenler

| Bileşen | Props |
|---|---|
| `layout/Header` | `title`, `text?`, `children` (menü başlık şeridinin içinde durur) |
| `layout/Navigation` | `current`, `onNavigate` |
| `layout/Footer` | — |
| `events/EventList` | `events`, `onShowDetail`, `emptyText?` → her etkinlik için `EventCard` (`key={event.id}`) |
| `events/EventCard` | `event`, `onShowDetail` |
| `events/EventFilter` | `searchText`, `category`, `categories`, `onSearchChange`, `onCategoryChange` |
| `events/EventDetail` | `event`, `onBack`, `onEdit` |
| `forms/EventForm` | `onSubmit` |

State (`page`, `selectedId`, `searchText`, `category`) App'te durur: veri aşağı props ile iner,
olaylar yukarı callback ile çıkar (lifting state). Ekran Sprint 4 ile birebir aynı.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build → dist/
npm run preview  # build edilmiş hâli açar
```
