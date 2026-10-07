// Ekleme ve güncelleme formu: değerleri data.js'teki alan adlarıyla bir nesneye çevirir,
// kendisi doğrular, hata ya da başarı mesajını gösterir.
// Veri kaydedilmez (localStorage yok); kalıcı kayıt backend sprintinde gelecek.
import { events, isoTarih, veriTarihi } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleme = form.dataset.mode === "guncelle";

// Hata yeri olan alanlar: form name'i → <span id="...-hata">
const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

// ---------- Güncelleme sayfası: ?id= ile etkinliği bul, formu doldur ----------
let etkinlik;
if (guncelleme) {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);

  if (etkinlik) {
    form.elements.ad.value = etkinlik.title;
    form.elements.kategori.value = etkinlik.category;
    form.elements.tarih.value = isoTarih(etkinlik.date); // date kutusu YYYY-AA-GG ister
    form.elements.saat.value = etkinlik.time;
    form.elements.yer.value = etkinlik.location;
    form.elements.kontenjan.value = etkinlik.capacity;
    form.elements.aciklama.value = etkinlik.description;

    document.title = `${etkinlik.title} · Etkinlik Güncelle`;
    document.querySelector("#detaya-don a").href = `etkinlik-detay.html?id=${etkinlik.id}`;
  } else {
    // id yok ya da yanlış: boş form değil, uyarı göster
    form.outerHTML = `<div class="uyari">
      <p class="hata-kutusu" role="alert"></p>
      <p><a class="buton" href="etkinlikler.html">Etkinliklere git</a></p>
    </div>`;
    document.querySelector(".uyari .hata-kutusu").textContent = id
      ? `"${id}" numaralı bir etkinlik yok. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.`
      : `Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.`;
    document.querySelector("#detaya-don").remove();
  }
}

// ---------- Doğrulama ----------
function dogrula(data) {
  const errors = {};

  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (data.category === "") errors.kategori = "Bir kategori seçin.";
  if (data.date === "") errors.tarih = "Tarih seçin.";
  if (data.time === "") errors.saat = "Saat seçin.";
  if (data.location === "") errors.yer = "Yer bilgisini yazın.";

  // Kontenjan zorunlu değil; girildiyse 1–1000 arası tam sayı olmalı.
  // badInput: kutuya sayı olmayan bir şey yazılmış ("e" gibi), value boş görünür.
  const kontenjanHatali =
    form.elements.kontenjan.validity.badInput ||
    (data.capacity !== null &&
      !(Number.isInteger(data.capacity) && data.capacity >= 1 && data.capacity <= 1000));
  if (kontenjanHatali) errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";

  return errors;
}

function hatalariGoster(errors) {
  for (const ad of alanlar) {
    const alan = form.elements[ad];
    const hataYeri = document.querySelector(`#${ad}-hata`);

    if (errors[ad]) {
      hataYeri.textContent = errors[ad];
      alan.setAttribute("aria-invalid", "true");
    } else {
      // Düzeltilen alanın eski hatası temizlenir
      hataYeri.textContent = "";
      alan.removeAttribute("aria-invalid");
    }
  }
}

// ---------- Kaydet / Güncelle ----------
function gonder(e) {
  e.preventDefault(); // sayfa yenilenmesin, yazılanlar kaybolmasın

  // Formdaki name'ler Türkçe, nesnenin alanları data.js'teki gibi İngilizce
  const fd = new FormData(form);
  const kontenjan = fd.get("kontenjan").trim();
  const data = {
    id: guncelleme ? etkinlik.id : `event-${events.length + 1}`,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih") ? veriTarihi(fd.get("tarih")) : "",
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjan === "" ? null : Number(kontenjan),
    description: fd.get("aciklama").trim(),
  };
  console.log(data);

  const errors = dogrula(data);
  hatalariGoster(errors);

  if (Object.keys(errors).length > 0) {
    mesaj.className = "form-mesaj hata-kutusu";
    mesaj.textContent = "Formda hatalı alanlar var. Kırmızı alanların altındaki uyarıları düzeltin.";
    form.elements[Object.keys(errors)[0]].focus();
    return;
  }

  mesaj.className = "form-mesaj basari-kutusu";
  mesaj.innerHTML = `<p>${guncelleme ? "Etkinlik güncellendi" : "Etkinlik oluşturuldu"} (bu sprintte kaydedilmez):</p><pre></pre>`;
  // Kullanıcının yazdıkları textContent ile basılır: HTML olarak çalışmaz
  mesaj.querySelector("pre").textContent = JSON.stringify(data, null, 2);
}

// Güncellemede etkinlik bulunamadıysa form sayfadan kalktı, dinlenecek bir şey yok
if (!guncelleme || etkinlik) {
  form.addEventListener("submit", gonder);
}
