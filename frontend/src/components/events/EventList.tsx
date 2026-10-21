import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
}

// Ana sayfa ve Etkinlikler aynı listeyi kullanır; kart kodu tek yerde
function EventList({ events, onShowDetail, emptyText }: EventListProps) {
  // Boşsa kartların yerine mesaj (verilmediyse hiçbir şey)
  if (events.length === 0) {
    return emptyText ? <p className="sonuc">{emptyText}</p> : null;
  }

  // key index değil id: filtre değişince sıra değişir
  return (
    <>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onShowDetail={onShowDetail} />
      ))}
    </>
  );
}

export default EventList;
