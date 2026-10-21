import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  text?: string; // alt yazı isteğe bağlı
  children?: ReactNode; // menü başlık şeridinin içinde durur (CSS: header grid)
}

function Header({ title, text, children }: HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
      {children}
    </header>
  );
}

export default Header;
