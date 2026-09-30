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
