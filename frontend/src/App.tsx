import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

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

function App() {
  // State burada kalır: bileşenler props ile okur, callback ile bildirir
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }
  const showDetail = (id: string) => go("detail", id);

  // Filtreli liste state değil: her çizimde yeniden hesaplanır
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Detayda başlık etkinliğin adı, diğer sayfalarda sabit
  const title = page === "detail" && selected ? selected.title : pageTitles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <Header title={title}>
        <Navigation current={page} onNavigate={go} />
      </Header>

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
                <EventList events={upcoming} onShowDetail={showDetail} />
              </section>
            </div>
            <p>
              <a className="buton" href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>
                Tüm etkinlikleri gör
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <div className="bolum">
            <EventFilter searchText={searchText} category={category} categories={categories}
              onSearchChange={setSearchText} onCategoryChange={setCategory} />
            {/* Liste boşsa "bulunamadı" mesajını EventList gösterir */}
            {filtered.length > 0 && (
              <p className="sonuc" aria-live="polite">{filtered.length} etkinlik listeleniyor.</p>
            )}
            <section className="kartlar kartlar-3">
              <EventList events={filtered} onShowDetail={showDetail} emptyText="Aramanıza uygun etkinlik bulunamadı." />
            </section>
          </div>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {/* Ekle ve Güncelle aynı form; kaydetme Sprint 6'da, şimdilik en üste kaydır */}
        {(page === "add" || page === "update") && <EventForm onSubmit={() => window.scrollTo(0, 0)} />}
      </main>

      <Footer />
    </>
  );
}

export default App;
