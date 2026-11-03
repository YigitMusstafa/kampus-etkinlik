import { useState } from "react";
import type { Category } from "../types/campus-event";
import { useEvents } from "../context/EventsContext";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useEvents();

  // Arama metnini sadece bu sayfa kullanıyor: state context'te değil, burada
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Kategori seçenekleri veriden: her kategori bir kez
  const categories = [...new Set(events.map((e) => e.category))];

  // Filtreli liste state değil: her çizimde yeniden hesaplanır
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <div className="bolum">
      <EventFilter searchText={searchText} category={category} categories={categories}
        onSearchChange={setSearchText} onCategoryChange={setCategory} />
      {/* Liste boşsa "bulunamadı" mesajını EventList gösterir */}
      {filtered.length > 0 && (
        <p className="sonuc" aria-live="polite">{filtered.length} etkinlik listeleniyor.</p>
      )}
      <section className="kartlar kartlar-3">
        <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
      </section>
    </div>
  );
}

export default EventsPage;
