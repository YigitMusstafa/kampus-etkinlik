import { NavLink } from "react-router-dom";

const menu = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" },
];

// NavLink açık sayfaya kendisi aria-current="page" ekler; CSS zaten boyuyor.
// end: onsuz "/" her adresle eşleşir, Ana Sayfa hep aktif görünür.
function Navigation() {
  return (
    <nav>
      {menu.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === "/"}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;
