// Ana sayfa ve Etkinlikler sayfası: kartları data.js'teki diziden üretir.
// data-limit varsa (ana sayfa) yaklaşan N etkinlik, yoksa hepsi + arama/kategori filtresi.
import { events, isoTarih, okunurTarih } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

function createCard(event) {
  return `<article class="kart">
    <h3>${event.title}</h3>
    <p><span class="rozet">${event.category}</span></p>
    <p>Tarih: <time datetime="${isoTarih(event.date)}T${event.time}">${okunurTarih(event.date)}, ${event.time}</time></p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

if (list.dataset.limit) {
  // Ana sayfa: tarihi geçmemiş etkinlikler, en yakından uzağa, ilk N tanesi
  const bugun = new Date().toLocaleDateString("sv-SE"); // yerel tarih, "2026-10-07" biçiminde
  const yaklasan = [...events]
    .filter((e) => isoTarih(e.date) >= bugun)
    .sort((a, b) => (isoTarih(a.date) + a.time).localeCompare(isoTarih(b.date) + b.time))
    .slice(0, Number(list.dataset.limit));

  if (yaklasan.length > 0) {
    render(yaklasan);
  } else {
    list.innerHTML = "<p>Şu an yaklaşan etkinlik yok.</p>";
  }
} else {
  render(events);
}

// ---------- Arama + kategori filtresi (sadece Etkinlikler sayfasında var) ----------
const filtreFormu = document.querySelector("#filtre-formu");

if (filtreFormu) {
  const arama = document.querySelector("#arama");
  const kategoriSecimi = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategori seçenekleri veriden: her kategori bir kez (Set tekrarları atar)
  const kategoriler = [...new Set(events.map((e) => e.category))]
    .sort((a, b) => a.localeCompare(b, "tr"));
  kategoriSecimi.innerHTML += kategoriler
    .map((k) => `<option value="${k}">${k}</option>`)
    .join("");

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const kategori = kategoriSecimi.value;

    // filter yeni dizi döner, events değişmez
    const sonuc = events.filter((e) => {
      const metin = `${e.title} ${e.category} ${e.location} ${e.description}`
        .toLocaleLowerCase("tr-TR");
      const metinUyuyor = metin.includes(aranan);
      const kategoriUyuyor = kategori === "" || e.category === kategori;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }

  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  // Enter'a basınca sayfa yenilenmesin
  filtreFormu.addEventListener("submit", (e) => e.preventDefault());

  filtrele();
}
