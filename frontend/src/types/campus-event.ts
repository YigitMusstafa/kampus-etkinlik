// Bir etkinlik neye benzer: bütün kayıtlar bu tarife uymak zorunda.
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string; // "YYYY-AA-GG"
  time: string; // "SS:DD"
  location: string;
  description: string;
  image?: string; // afiş isteğe bağlı
}

// Formdaki değerler: id yok; input hep metin verdiği için kontenjan string,
// kategori seçilmediyse ""
export interface EventFormData {
  title: string;
  category: Category | "";
  capacity: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

// Her alana en fazla bir hata mesajı
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
