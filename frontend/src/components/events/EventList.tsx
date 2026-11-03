import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

// Ana sayfa ve Etkinlikler aynı listeyi kullanır; kart kodu tek yerde
function EventList({ events, emptyText }: EventListProps) {
  // Dizi boşsa sadece mesaj
  if (events.length === 0) return <p className="sonuc">{emptyText}</p>;

  // key index değil id: filtre değişince sıra değişir
  return (
    <>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </>
  );
}

export default EventList;
