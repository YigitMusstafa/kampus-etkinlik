import { useEffect, type ReactNode } from "react";
import { matchPath, useLocation } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";

const pageTitles = [
  { path: "/", title: "Kampüs Etkinlikleri" },
  { path: "/events", title: "Tüm Etkinlikler" },
  { path: "/admin", title: "Etkinlik Yönetimi" },
  { path: "/admin/new", title: "Etkinlik Ekle" },
  { path: "/login", title: "Giriş Yap" },
  { path: "/register", title: "Kayıt Ol" },
  { path: "/forgot-password", title: "Şifremi Unuttum" },
];

const notFound = "Sayfa bulunamadı";

// Başlık adresten: detayda etkinliğin adı, diğer sayfalarda sabit
function pageTitle(pathname: string, events: CampusEvent[]): string {
  const detail = matchPath("/events/:id", pathname);
  if (detail) return findEventById(events, detail.params.id ?? "")?.title ?? notFound;

  const edit = matchPath("/admin/:id/edit", pathname);
  if (edit) return findEventById(events, edit.params.id ?? "") ? "Etkinlik Güncelle" : notFound;

  return pageTitles.find((p) => matchPath(p.path, pathname))?.title ?? notFound;
}

// children: menü başlık şeridinin içinde durur (CSS: header grid)
function Header({ children }: { children?: ReactNode }) {
  const { pathname } = useLocation();
  const { events } = useEvents();
  const title = pageTitle(pathname, events);

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <header>
      <h1>{title}</h1>
      {children}
    </header>
  );
}

export default Header;
