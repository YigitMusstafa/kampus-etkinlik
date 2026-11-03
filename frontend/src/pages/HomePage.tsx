import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents();

  // En yakın 2 etkinlik; kopya sıralanır, events bozulmaz
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <p>
        Kampüs Etkinlikleri, SDÜ Yapay Zekâ Uygulama ve Araştırma Merkezi'nin (AIARC)
        düzenlediği "Minds of AI" webinar serisi başta olmak üzere kampüsteki
        etkinlikleri tek yerden takip edebileceğiniz basit bir duyuru sayfasıdır.
      </p>
      <div className="bolum">
        <h2 id="yaklasan-baslik">Yaklaşan Etkinlikler</h2>
        <section className="kartlar" aria-labelledby="yaklasan-baslik">
          <EventList events={upcoming} />
        </section>
      </div>
      <p>
        <Link className="buton" to="/events">Tüm etkinlikleri gör</Link>
      </p>
    </>
  );
}

export default HomePage;
