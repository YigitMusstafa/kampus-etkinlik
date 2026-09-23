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

- GitHub repo linki: `<TODO: repo linkini buraya yapıştır>`
- Git tag: `sprint-01`
- Canlı URL (Vercel): `<TODO: deploy sonrası Vercel adresini buraya yapıştır>`

## Bitti demeden önce kontrol listesi

- [ ] Beş sayfa canlı adreste açılıyor
- [ ] Menüde kırık bağlantı yok
- [ ] Her sayfada tek `h1`, düzgün sıra
- [ ] Her alanın görünür `label`'ı var
- [ ] `required` uyarısı çalışıyor
- [ ] Her etkinlik bir hücre, içi aynı sırada
- [ ] Hiç CSS ve JavaScript yok
- [ ] README'de canlı URL yazıyor
