import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

// Etkinliği bulmak EventDetailPage'in işi; bileşen hazır etkinliği gösterir
function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="detay">
      {event.image && (
        <figure className="afis-cerceve">
          <img src={event.image} alt={`${event.title} afişi`} />
          <figcaption>{event.title} afişi</figcaption>
        </figure>
      )}

      <section className="kunye" aria-labelledby="kunye-baslik">
        <h2 id="kunye-baslik">Etkinlik Künyesi</h2>
        <dl>
          <dt>Tarih</dt>
          <dd>
            <time dateTime={`${event.date}T${event.time}`}>
              {formatDate(event.date)}, {event.time}
            </time>
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </section>

      <h2>Açıklama</h2>
      <p>{event.description}</p>

      <p className="butonlar">
        <Link className="buton geri" to="/events">Listeye dön</Link>
        <Link className="buton" to={`/admin/${event.id}/edit`}>Bu etkinliği güncelle</Link>
      </p>
    </article>
  );
}

export default EventDetail;
