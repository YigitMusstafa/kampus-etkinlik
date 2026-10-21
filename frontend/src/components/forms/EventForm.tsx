interface EventFormProps {
  onSubmit: () => void;
}

// Form ne yapılacağını bilmez: kaydetmeyi App verir (Ekle ve Güncelle aynı form)
function EventForm({ onSubmit }: EventFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <p className="form-not">Yıldızlı (*) alanlar zorunludur. Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

      <p>
        <label htmlFor="ad">Etkinlik Adı *</label>
        <input type="text" id="ad" name="ad" required />
      </p>

      <p>
        <label htmlFor="kategori">Kategori *</label>
        <select id="kategori" name="kategori" required>
          <option value="">Seçiniz</option>
          <option value="Atölye">Atölye</option>
          <option value="Seminer">Seminer</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>
      </p>

      <p>
        <label htmlFor="tarih">Tarih *</label>
        <input type="date" id="tarih" name="tarih" required />
      </p>

      <p>
        <label htmlFor="saat">Saat *</label>
        <input type="time" id="saat" name="saat" required />
      </p>

      <p>
        <label htmlFor="yer">Yer *</label>
        <input type="text" id="yer" name="yer" placeholder="Örn. Mühendislik Fakültesi Konferans Salonu" required />
      </p>

      <p>
        <label htmlFor="kontenjan">Kontenjan</label>
        <input type="number" id="kontenjan" name="kontenjan" min={1} max={1000} step={1} inputMode="numeric" />
      </p>

      <p>
        <label htmlFor="aciklama">Açıklama</label>
        <textarea id="aciklama" name="aciklama" rows={4} />
      </p>

      <button type="submit">Kaydet</button>
    </form>
  );
}

export default EventForm;
