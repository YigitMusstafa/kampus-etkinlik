import { useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";

// Page bulur, component çizer: adres → id → etkinlik → EventDetail
function EventDetailPage() {
  const { id } = useParams(); // 1. adres
  const { events } = useEvents(); // 2. veri
  // useParams'ın tipi string | undefined; undefined gelirse boş metin
  const event = findEventById(events, id ?? "");
  if (!event) return <NotFoundPage />; // 3. yoksa

  // Başlık (etkinliğin adı) Sprint 5'teki gibi üstteki şeritte, Header adresten bulur
  return <EventDetail event={event} />;
}

export default EventDetailPage;
