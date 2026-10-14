import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

// Router yok: hangi sayfanın açık olduğunu state tutar
type PageName = "home" | "events" | "detail" | "add" | "update";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const pageTitles: Record<PageName, string> = {
  home: "Kampüs Etkinlikleri",
  events: "Tüm Etkinlikler",
  detail: "Etkinlik bulunamadı",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

// En yakın 2 etkinlik; kopya sıralanır, events bozulmaz
const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

// Kategori seçenekleri veriden: her kategori bir kez
const categories = [...new Set(events.map((e) => e.category))];

// "2026-10-12" → "12 Ekim 2026"
const formatDate = (date: string) => new Date(`${date}T00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Filtreli liste state değil: her çizimde yeniden hesaplanır
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Detayda başlık etkinliğin adı, diğer sayfalarda sabit
  const title = page === "detail" && selected ? selected.title : pageTitles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  // Ana sayfa ve Etkinlikler aynı kartı kullanır
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p><span className="rozet">{event.category}</span></p>
        <p>Tarih: <time dateTime={`${event.date}T${event.time}`}>{formatDate(event.date)}, {event.time}</time></p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
        <nav>
          {menu.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <p>
              Kampüs Etkinlikleri, SDÜ Yapay Zekâ Uygulama ve Araştırma Merkezi'nin (AIARC)
              düzenlediği "Minds of AI" webinar serisi başta olmak üzere kampüsteki
              etkinlikleri tek yerden takip edebileceğiniz basit bir duyuru sayfasıdır.
            </p>

            <div className="bolum">
              <h2 id="yaklasan-baslik">Yaklaşan Etkinlikler</h2>
              <section className="kartlar" aria-labelledby="yaklasan-baslik">
                {upcoming.map(renderCard)}
              </section>
            </div>

            <p>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <div className="bolum">
            <form className="filtre" role="search" onSubmit={(e) => e.preventDefault()}>
              <p>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  name="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  name="kategori"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </p>
            </form>

            <p className="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="kartlar kartlar-3">
              {filtered.map(renderCard)}
            </section>
          </div>
        )}

        {page === "detail" && !selected && (
          <>
            <p className="hata-kutusu" role="alert">
              Etkinlik bulunamadı. Listeden bir etkinlik seçin.
            </p>
            <p>
              <a
                className="buton geri"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Listeye dön
              </a>
            </p>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            {selected.image && (
              <figure className="afis-cerceve">
                <img src={selected.image} alt={`${selected.title} afişi`} />
                <figcaption>{selected.title} afişi</figcaption>
              </figure>
            )}

            <section className="kunye" aria-labelledby="kunye-baslik">
              <h2 id="kunye-baslik">Etkinlik Künyesi</h2>
              <dl>
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={`${selected.date}T${selected.time}`}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </section>

            <h2>Açıklama</h2>
            <p>{selected.description}</p>

            <p className="butonlar">
              <a
                className="buton geri"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Listeye dön
              </a>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("update", selected.id);
                }}
              >
                Bu etkinliği güncelle
              </a>
            </p>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <form onSubmit={(e) => e.preventDefault()}>
            <p className="form-not">Yıldızlı (*) alanlar zorunludur. Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

            <p>
              <label htmlFor="ad">Etkinlik Adı *</label>
              <input type="text" id="ad" name="ad" required />
            </p>

            <p>
              <label htmlFor="kategori">Kategori *</label>
              <select id="kategori" name="kategori" required>
                <option value="">Seçiniz</option>
                <option value="Atölye">Atölye</option>
                <option value="Seminer">Seminer</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>
            </p>

            <p>
              <label htmlFor="tarih">Tarih *</label>
              <input type="date" id="tarih" name="tarih" required />
            </p>

            <p>
              <label htmlFor="saat">Saat *</label>
              <input type="time" id="saat" name="saat" required />
            </p>

            <p>
              <label htmlFor="yer">Yer *</label>
              <input type="text" id="yer" name="yer" placeholder="Örn. Mühendislik Fakültesi Konferans Salonu" required />
            </p>

            <p>
              <label htmlFor="kontenjan">Kontenjan</label>
              <input type="number" id="kontenjan" name="kontenjan" min={1} max={1000} step={1} inputMode="numeric" />
            </p>

            <p>
              <label htmlFor="aciklama">Açıklama</label>
              <textarea id="aciklama" name="aciklama" rows={4} />
            </p>

            <button type="submit">Kaydet</button>
          </form>
        )}
      </main>

      <footer>
        <p>Mustafa Yiğit Emet · 2321032021 · 2026</p>
      </footer>
    </>
  );
}

export default App;
