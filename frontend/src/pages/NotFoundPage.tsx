import { Link } from "react-router-dom";

// Hiçbir adrese uymayan her şey ve bulunamayan etkinlik
function NotFoundPage() {
  return (
    <>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <p>
        <Link className="buton" to="/">Ana sayfaya dön</Link>
      </p>
    </>
  );
}

export default NotFoundPage;
