https://kampus-etkinlik-alpha.vercel.app

# Kampüs Etkinlikleri — Sprint 1

Kampüs Etkinlikleri uygulamasının iskeleti. Sadece HTML ile kuruldu (CSS yok,
JavaScript yok) ve Vercel üzerinden canlıya alınacak.

## Klasör yapısı

```
kampus-etkinlik/
  sprint1/
    index.html
    etkinlikler.html
    etkinlik-detay.html
    etkinlik-ekle.html
    etkinlik-guncelle.html
    afis.jpg
  .gitignore
  README.md
```

## Sayfalar

| Sayfa | Açıklama |
|---|---|
| `index.html` | Ana sayfa — uygulama amacı, iki yaklaşan etkinlik, diğer sayfalara linkler |
| `etkinlikler.html` | Etkinlik listesi (tablo, her etkinlik tek hücre) + Ayın Programı özet tablosu |
| `etkinlik-detay.html` | Bir etkinliğin ayrıntı sayfası (afiş, künye listesi, açıklama) |
| `etkinlik-ekle.html` | Yeni etkinlik ekleme formu |
| `etkinlik-guncelle.html` | Aynı form, alanlar mevcut değerlerle dolu |

Tüm sayfalarda ortak iskelet: `header` (h1 + nav) → `main` → `footer`.
CSS ve JavaScript hiçbir sayfada kullanılmadı; linkler mavi/altı çizili ve
form alanları tarayıcı varsayılan stiliyle görünüyor.

## Yerelde görüntüleme

Herhangi bir sunucuya gerek yok, dosyaları doğrudan tarayıcıda açabilirsin:

```
sprint1/index.html dosyasını çift tıkla / tarayıcıya sürükle
```

## GitHub'a gönderme

```bash
cd kampus-etkinlik
git init                      # repo daha önce oluşturulmadıysa
git add .
git commit -m "Sprint 1: HTML iskeleti"
# ... gerekirse birkaç anlamlı commit daha at ...
git branch -M main
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
git tag sprint-01
git push --tags
```

## Vercel'de yayına alma

1. https://vercel.com → GitHub ile giriş yap
2. **Add New → Project** → bu repoyu seç
3. Framework Preset: **Other**, build komutu yok
4. **Root Directory**: `sprint1`
5. **Deploy**'a bas → canlı adres hazır olur

Ana sayfa `index.html` olduğu için adres doğrudan onu açar.

## Teslim

- GitHub repo linki: https://github.com/YigitMusstafa/kampus-etkinlik
- Git tag: `sprint-01`
- Canlı URL (Vercel): https://kampus-etkinlik-alpha.vercel.app

## Bitti demeden önce kontrol listesi

- [x] Beş sayfa canlı adreste açılıyor
- [x] Menüde kırık bağlantı yok
- [x] Her sayfada tek `h1`, düzgün sıra
- [x] Her alanın görünür `label`'ı var
- [x] `required` uyarısı çalışıyor
- [x] Her etkinlik bir hücre, içi aynı sırada
- [x] Hiç CSS ve JavaScript yok
- [x] README'de canlı URL yazıyor

---

# Sprint 2 — CSS ve Responsive

`sprint1` olduğu gibi duruyor; Sprint 2 onun kopyası olan `sprint2/` klasöründe.
Beş sayfa da `sprint2/css/2321032021.css` dosyasına bağlı.

- `--no: 2321032021` → `--ton` = 2321032021 mod 360 = **61** (zeytin/hardal tonu)
- Son hane **1** → `--font: Verdana`
- Renk ve boşlukların hepsi `var(--...)` ile; ek renkler de `--ton`'dan türetildi
- Etkinlikler tablodan çıkarıldı: `section > article` kartlar + `display: grid`
  (telefonda tek sütun, geniş ekranda 2–3 sütun)
- Detay sayfasında afiş solda, künye (`dl`) sağda; telefonda alt alta
- Formlarda label üstte, boş gönderilen alan kırmızı ve altında uyarı çıkıyor
- Menü: Ana Sayfa · Etkinlikler · Ekle · Güncelle (telefonda 2 × 2)

**Vercel:** Settings → Root Directory → `sprint2`

**Teslim:** Git tag `sprint-02`

---

# Sprint 3 — JavaScript ve DOM

`sprint2` olduğu gibi duruyor; Sprint 3 onun kopyası olan `sprint3/` klasöründe.
Veri tek yerde (`js/data.js`), sayfalar ondan üretiliyor. Framework, jQuery ve
localStorage yok; form veriyi kaydetmez (kalıcı kayıt backend sprintlerinde).

```
sprint3/
  css/2321032021.css
  js/
    data.js           6 etkinlik (export const events = [...]) + tarih yardımcıları
    event-list.js     index.html, etkinlikler.html
    event-detail.js   etkinlik-detay.html
    event-form.js     etkinlik-ekle.html, etkinlik-guncelle.html
  index.html, etkinlikler.html, etkinlik-detay.html,
  etkinlik-ekle.html, etkinlik-guncelle.html, favicon.svg
```

- **data.js:** 6 etkinlik; her nesnede `id, title, category, date, time, location,
  description, capacity`. Tarih `GG-AA-YYYY`, saat `SS:DD`. Atölye ve Seminer'de
  ikişer etkinlik var.
- **Liste:** HTML'de elle yazılmış kart yok; `createCard` + `map/join/innerHTML`.
  Her "Detayları gör" linki `etkinlik-detay.html?id=event-N`. Tarih
  `toLocaleDateString("tr-TR")` ile "16 Ekim 2026" gibi yazılıyor.
- **Ana sayfa:** aynı modül; `data-limit="2"` olduğu için tarihi geçmemiş en yakın
  2 etkinlik (`[...events]` kopyası sıralanıyor, asıl dizi bozulmuyor).
- **Arama + kategori:** kategoriler veriden (`new Set`), arama `input`, kategori
  `change` ile çalışıyor; ikisi birlikte (`filter` + `&&`), Türkçe İ/ı için
  `toLocaleLowerCase("tr-TR")`. Sonuç sayısı ya da "bulunamadı" mesajı yazılıyor.
- **Detay:** `URLSearchParams` + `find`; geçersiz ya da eksik id'de kırmızı hata
  kutusu ve "Listeye dön", konsolda hata yok.
- **Form:** `novalidate`, `submit` + `preventDefault` + `FormData`; hatalı alan
  kırmızı (`aria-invalid`) ve altında mesaj; hepsi doğruysa yeşil kutuda nesne
  (`JSON.stringify`).
- **Güncelleme:** menüde yok, sadece detaydaki "Bu etkinliği güncelle" ile
  gelinir (`?id=`). Form o etkinlikle dolu açılır; id yoksa form yerine uyarı.

**Yerelde:** modüller `file://` ile çalışmaz. VS Code → Live Server →
`http://127.0.0.1:5500/sprint3/`

**Vercel:** Settings → Root Directory → `sprint3`

**Teslim:** Git tag `sprint-03`

---

# Sprint 4 — Vite, TypeScript ve React

`sprint3` olduğu gibi duruyor; aynı site `frontend/` klasöründe Vite React-TS
projesi olarak yeniden yazıldı. Live Server yok, sayfayı Vite açıyor.
React Router yok (Sprint 6): sayfa geçişi `useState` ile, adres çubuğu hep aynı.

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

```
frontend/src/
  types/campus-event.ts   Category (4 değerli union) + CampusEvent arayüzü
  data/events.ts          6 etkinlik, CampusEvent[] tipli
  utils/filter-events.ts  searchEvents, filterByCategory, findEventById (saf)
  App.tsx, App.css, index.css, main.tsx
```

- **Tipler:** kategori sadece `Seminer | Atölye | Söyleşi | Yarışma`; Sprint 3'teki
  Webinar → Seminer, Panel → Söyleşi oldu. Tarihler `YYYY-AA-GG` (sıralama için).
- **Ana sayfa:** `sort + slice` ile en yakın 2 etkinlik, `renderCard` + `map`, her kartta `key`.
- **Etkinlikler:** arama ve kategori state (controlled input); filtreli liste her
  çizimde hesaplanıyor; 0 sonuçta "bulunamadı".
- **Detay:** seçili id state'ten, `findEventById`; afiş sadece varsa (`event-1`).
- **Ekle / Güncelle:** aynı form bloğu, başlık sayfaya göre; sadece görünüm, kayıt yok.
- **Sekme adı:** `useEffect` ile `Kampüs Etkinlikleri — {başlık}`.

**Yerelde:** `cd frontend` → `npm install` → `npm run dev` → `http://localhost:5173`

**Vercel:** Settings → Root Directory → `frontend`, Framework Preset → `Vite`

**Teslim:** Git tag `sprint-04`
