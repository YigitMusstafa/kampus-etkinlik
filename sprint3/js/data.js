// Kampüs Etkinlikleri verisi: bütün sayfalar bu diziden üretilir.
// Kurallar: her nesnede aynı alanlar, id'ler benzersiz,
// tarih GG-AA-YYYY, saat SS:DD, kategori adları hep aynı yazımla.
export const events = [
  {
    id: "event-1",
    title: "AI’s Path Forward: From Intelligence to Super-intelligence",
    category: "Webinar",
    date: "13-02-2026",
    time: "11:30",
    location: "Çevrimiçi (Zoom)",
    description: "AIARC'ın \"Minds of AI\" webinar serisinin 2. oturumunda Dr. Deepak Painuli, yapay zekânın süper zekâya uzanan yolunu anlatıyor.",
    capacity: 200,
  },
  {
    id: "event-2",
    title: "Yapay Zekâ ve Yöneylem Araştırması Arakesiti",
    category: "Panel",
    date: "16-10-2026",
    time: "14:00",
    location: "Çevrimiçi (Zoom)",
    description: "AIARC'ın \"Minds of AI\" serisi kapsamında yapay zekâ ile yöneylem araştırmasının kesişimini konu alan panel oturumu.",
    capacity: 150,
  },
  {
    id: "event-3",
    title: "Python ile Veri Analizi Atölyesi",
    category: "Atölye",
    date: "22-10-2026",
    time: "13:30",
    location: "Mühendislik Fakültesi Bilgisayar Laboratuvarı 2",
    description: "Pandas ve Matplotlib ile gerçek bir veri setini temizleyip görselleştirme. Başlangıç seviyesi; dizüstü bilgisayarınızı getirin.",
    capacity: 25,
  },
  {
    id: "event-4",
    title: "Yapay Zekâ Çağında Etik ve Sorumluluk",
    category: "Seminer",
    date: "05-11-2026",
    time: "14:00",
    location: "Mühendislik Fakültesi Konferans Salonu",
    description: "Algoritmik önyargı, veri gizliliği ve sorumlu yazılım geliştirme üzerine öğretim üyeleriyle seminer.",
    capacity: 120,
  },
  {
    id: "event-5",
    title: "Arduino ile Robotik Atölyesi",
    category: "Atölye",
    date: "19-11-2026",
    time: "10:00",
    location: "Elektronik Laboratuvarı",
    description: "Arduino ile çizgi izleyen robot yapımı. Malzemeler atölyede verilir, ön bilgi gerekmez.",
    capacity: 20,
  },
  {
    id: "event-6",
    title: "Mezunlarla Kariyer Sohbetleri",
    category: "Seminer",
    date: "03-12-2026",
    time: "15:00",
    location: "Rektörlük Konferans Salonu",
    description: "Bilgisayar mühendisliği mezunları sektördeki ilk yıllarını ve iş başvurusu deneyimlerini anlatıyor.",
    capacity: 150,
  },
];

// "12-10-2026" → "2026-10-12": sıralama, <time datetime> ve tarih kutusu için
export function isoTarih(tarih) {
  const [gun, ay, yil] = tarih.split("-");
  return `${yil}-${ay}-${gun}`;
}

// "2026-10-12" → "12-10-2026": formdan gelen tarihi verideki biçime çevirir
export function veriTarihi(iso) {
  const [yil, ay, gun] = iso.split("-");
  return `${gun}-${ay}-${yil}`;
}

// "12-10-2026" → "12 Ekim 2026"
export function okunurTarih(tarih) {
  const [gun, ay, yil] = tarih.split("-").map(Number);
  return new Date(yil, ay - 1, gun).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
