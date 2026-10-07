// Detay sayfası: adresteki ?id= ile data.js'ten doğru etkinliği bulup gösterir.
import { events, isoTarih, okunurTarih } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("#baslik");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

// Önce kontrol: find bulamazsa undefined döner, event.title okunmaz
if (!event) {
  baslik.textContent = "Etkinlik bulunamadı";
  document.title = "Etkinlik bulunamadı · Kampüs Etkinlikleri";
  container.innerHTML = `<p class="hata-kutusu" role="alert"></p>
    <p><a class="buton geri" href="etkinlikler.html">Listeye dön</a></p>`;
  // id adresten geliyor: textContent ile yaz ki HTML olarak çalışmasın
  container.querySelector(".hata-kutusu").textContent = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Adreste etkinlik numarası (id) yok. Listeden bir etkinlik seçin.";
} else {
  const tarih = `${okunurTarih(event.date)}, ${event.time}`;

  baslik.textContent = event.title;
  document.title = `${event.title} · Kampüs Etkinlikleri`;
  container.innerHTML = `<article class="detay">
    <figure class="afis-cerceve">
      <div class="afis" role="img" aria-label="${event.title} afişi: ${tarih}, ${event.location}">
        <span class="afis-kategori">${event.category}</span>
        <span class="afis-baslik">${event.title}</span>
        <span class="afis-tarih">${tarih}</span>
        <span class="afis-yer">${event.location}</span>
      </div>
      <figcaption>${event.title} afişi</figcaption>
    </figure>

    <section class="kunye" aria-labelledby="kunye-baslik">
      <h2 id="kunye-baslik">Etkinlik Künyesi</h2>
      <dl>
        <dt>Tarih</dt>
        <dd><time datetime="${isoTarih(event.date)}T${event.time}">${tarih}</time></dd>
        <dt>Yer</dt>
        <dd>${event.location}</dd>
        <dt>Kategori</dt>
        <dd>${event.category}</dd>
        <dt>Kontenjan</dt>
        <dd>${event.capacity} kişi</dd>
      </dl>
    </section>

    <h2>Açıklama</h2>
    <p>${event.description}</p>

    <p class="butonlar">
      <a class="buton geri" href="etkinlikler.html">Listeye dön</a>
      <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
    </p>
  </article>`;
}
