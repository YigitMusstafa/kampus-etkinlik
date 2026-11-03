import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Category, EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

const categories: Category[] = ["Atölye", "Seminer", "Söyleşi", "Yarışma"];

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

// Form kaydetmeyi bilmez: geçerli veriyi sayfaya verir (Ekle ve Güncelle aynı form)
function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  // Bütün alanların değeri tek state nesnesinde (controlled form)
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  // Tek fonksiyon bütün alanlara yeter: [e.target.name] hangi alanın değiştiğini söyler
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  // Gönder → doğrula → hata yoksa yukarı bildir
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  // noValidate: tarayıcının kendi balonları değil, bizim mesajlarımız
  return (
    <form noValidate onSubmit={handleSubmit}>
      <p className="form-not">Yıldızlı (*) alanlar zorunludur.</p>

      <p>
        <label htmlFor="title">Etkinlik Adı *</label>
        <input type="text" id="title" name="title" required
          value={data.title} onChange={handleChange}
          aria-invalid={errors.title ? true : undefined} />
        <span className="hata">{errors.title}</span>
      </p>

      <p>
        <label htmlFor="category">Kategori *</label>
        <select id="category" name="category" required
          value={data.category} onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}>
          <option value="">Seçiniz</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span className="hata">{errors.category}</span>
      </p>

      <p>
        <label htmlFor="date">Tarih *</label>
        <input type="date" id="date" name="date" required
          value={data.date} onChange={handleChange}
          aria-invalid={errors.date ? true : undefined} />
        <span className="hata">{errors.date}</span>
      </p>

      <p>
        <label htmlFor="time">Saat *</label>
        <input type="time" id="time" name="time" required
          value={data.time} onChange={handleChange}
          aria-invalid={errors.time ? true : undefined} />
        <span className="hata">{errors.time}</span>
      </p>

      <p>
        <label htmlFor="location">Yer *</label>
        <input type="text" id="location" name="location" required
          placeholder="Örn. Mühendislik Fakültesi Konferans Salonu"
          value={data.location} onChange={handleChange}
          aria-invalid={errors.location ? true : undefined} />
        <span className="hata">{errors.location}</span>
      </p>

      <p>
        <label htmlFor="capacity">Kontenjan *</label>
        <input type="number" id="capacity" name="capacity" required
          min={1} max={1000} step={1} inputMode="numeric"
          value={data.capacity} onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined} />
        <span className="hata">{errors.capacity}</span>
      </p>

      <p>
        <label htmlFor="description">Açıklama *</label>
        <textarea id="description" name="description" rows={4} required
          value={data.description} onChange={handleChange}
          aria-invalid={errors.description ? true : undefined} />
        <span className="hata">{errors.description}</span>
      </p>

      <button type="submit">{submitText}</button>
    </form>
  );
}

export default EventForm;
