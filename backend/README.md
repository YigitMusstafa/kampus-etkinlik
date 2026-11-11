# Kampüs Etkinlikleri — Backend

Etkinlikleri JSON olarak veren Express sunucusu. Veri şimdilik bellekte
(`src/data/events.js`); sunucu yeniden başlayınca POST ile eklenenler kaybolur.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env
npm run dev      # http://localhost:3000
```

`npm run dev` dosya değişince sunucuyu yeniden başlatır (`node --watch`);
`npm start` izlemeden çalıştırır.

## Ortam değişkeni

| Değişken | Örnek | Ne işe yarar |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinlediği port |

Değerler `.env` dosyasından okunur (`.env` GitHub'a gitmez, örnek `.env.example`'da).

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/events` | Listeyi getir | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

`GET /events?category=Atölye` ile liste kategoriye göre süzülebilir.
`GET /health` sunucunun ayakta olduğunu gösterir (200).

Status code'lar: 200 tamam · 201 oluşturuldu · 204 içerik yok ·
400 eksik/yanlış veri · 404 bulunamadı

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```
