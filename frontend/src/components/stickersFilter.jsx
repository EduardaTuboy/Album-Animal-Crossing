import { useMemo } from "react";
import "../styles/table.css";
import "../styles/stickersFilter.css";
import deleteIcon from "../assets/delete2.png";

const capitalizeFirstLetter = (valor) => {
  if (!valor) return "";
  const texto = String(valor);
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

export function StickersFilter({
  data,
  filters,
  onFilterChange,
  onClearFilters,
  isAlbum,
}) {
  const speciesOptions = useMemo(
    () =>
      Array.from(new Set(data.map((i) => i.species)))
        .filter(Boolean)
        .sort(),
    [data],
  );
  const hobbyOptions = useMemo(
    () =>
      Array.from(new Set(data.map((i) => i.hobbie)))
        .filter(Boolean)
        .sort(),
    [data],
  );
  const personalityOptions = useMemo(
    () =>
      Array.from(new Set(data.map((i) => i.personality)))
        .filter(Boolean)
        .sort(),
    [data],
  );
  const genderOptions = useMemo(
    () =>
      Array.from(new Set(data.map((i) => i.gender)))
        .filter(Boolean)
        .sort(),
    [data],
  );

  const rarityOptions = useMemo(() => {
    const order = ["common", "rare", "legendary"];
    const uniq = Array.from(new Set(data.map((i) => i.rarity).filter(Boolean)));
    return uniq.sort((a, b) => {
      const ai = order.indexOf(String(a).toLowerCase());
      const bi = order.indexOf(String(b).toLowerCase());
      if (ai > -1 && bi > -1) return ai - bi;
      if (ai > -1) return -1;
      if (bi > -1) return 1;
      return String(a).localeCompare(String(b));
    });
  }, [data]);

  const hasActiveFilters = Object.values(filters).some((val) => val !== "");

  return (
    <div className="filter">
      <h2>Filters</h2>
      <div className="filter-bar">
        <select
          value={filters.species || ""}
          onChange={(e) => onFilterChange("species", e.target.value)}
        >
          <option value="">ALL SPECIES</option>
          {speciesOptions.map((opt) => (
            <option key={opt} value={opt}>
              {capitalizeFirstLetter(opt)}
            </option>
          ))}
        </select>
        <select
          value={filters.hobbie || ""}
          onChange={(e) => onFilterChange("hobbie", e.target.value)}
        >
          <option value="">ALL HOBBIES</option>
          {hobbyOptions.map((opt) => (
            <option key={opt} value={opt}>
              {capitalizeFirstLetter(opt)}
            </option>
          ))}
        </select>
        <select
          value={filters.personality || ""}
          onChange={(e) => onFilterChange("personality", e.target.value)}
        >
          <option value="">ALL PERSONALITIES</option>
          {personalityOptions.map((opt) => (
            <option key={opt} value={opt}>
              {capitalizeFirstLetter(opt)}
            </option>
          ))}
        </select>
        <select
          value={filters.gender || ""}
          onChange={(e) => onFilterChange("gender", e.target.value)}
        >
          <option value="">BOTH GENDERS</option>
          {genderOptions.map((opt) => (
            <option key={opt} value={opt}>
              {capitalizeFirstLetter(opt)}
            </option>
          ))}
        </select>
        <select
          value={filters.rarity || ""}
          onChange={(e) => onFilterChange("rarity", e.target.value)}
        >
          <option value="">ALL RARITIES</option>
          {rarityOptions.map((opt) => (
            <option key={opt} value={opt}>
              {capitalizeFirstLetter(opt)}
            </option>
          ))}
        </select>
        {isAlbum && (
          <select
            value={filters.status || ""}
            onChange={(e) => onFilterChange("status", e.target.value)}
          >
            <option value="">ALL STATUSES</option>
            <option value="missing">MISSING (0)</option>
            <option value="unlocked">UNLOCKED (1)</option>
            <option value="repeating">REPEATING (2+)</option>
          </select>
        )}

        {hasActiveFilters && (
          <button onClick={onClearFilters} className="delete">
            <img src={deleteIcon} alt="Delete" />
            CLEAR FILTER
          </button>
        )}
      </div>
    </div>
  );
}
