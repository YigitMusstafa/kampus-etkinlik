import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

// State App'te (lifting state): kutu değeri gösterir, değişikliği yukarı bildirir
function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <form className="filtre" role="search" onSubmit={(e) => e.preventDefault()}>
      <p>
        <label htmlFor="arama">Etkinlik ara</label>
        <input
          type="search"
          id="arama"
          name="arama"
          placeholder="Örn. atölye, kariyer"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="kategori-filtre">Kategori</label>
        <select
          id="kategori-filtre"
          name="kategori"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </p>
    </form>
  );
}

export default EventFilter;
