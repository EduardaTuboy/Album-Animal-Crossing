import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import "../styles/album.css";
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png";
import Sticker from "../components/sticker";
import missingSticker from "../assets/missing-sticker.png";
import { useAlbum } from "../api/stickersQueries.js";
import { StickersFilter } from "../components/stickersFilter";

export const Route = createFileRoute("/album")({
  component: Album,
});

function Album() {
  const [currentSpeciesIndex, setCurrentSpeciesIndex] = useState(0);
  const currentUserEmail = "usuario@exemplo.com";

  const {
    data: stickers = [],
    isLoading,
    isError,
    error,
  } = useAlbum(currentUserEmail);

  const [filters, setFilters] = useState({
    species: "",
    hobbie: "",
    personality: "",
    gender: "",
    rarity: "",
    status: "",
  });

  const filteredStickers = useMemo(() => {
    return stickers.filter((s) => {
      if (filters.species && s.species !== filters.species) return false;
      if (filters.hobbie && s.hobbie !== filters.hobbie) return false;
      if (filters.personality && s.personality !== filters.personality)
        return false;
      if (filters.gender && s.gender !== filters.gender) return false;
      if (filters.rarity && s.rarity !== filters.rarity) return false;

      if (filters.status) {
        const amount = s.amount || 0;
        if (filters.status === "missing" && amount > 0) return false;
        if (filters.status === "unlocked" && amount !== 1) return false;
        if (filters.status === "repeating" && amount < 2) return false;
      }

      return true;
    });
  }, [stickers, filters]);

  const categories = Array.from(
    new Set(filteredStickers.map((s) => s.species)),
  ).sort();

  const activeIndex = Math.min(
    currentSpeciesIndex,
    Math.max(0, categories.length - 1),
  );
  const currentPageCategory = categories[activeIndex];

  const stickersInPage = filteredStickers
    .filter((s) => s.species === currentPageCategory)
    .sort((a, b) => a.number - b.number);

  return (
    <main>
      <StickersFilter
        data={stickers}
        isAlbum={true}
        filters={filters}
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
          setCurrentSpeciesIndex(0);
        }}
        onClearFilters={() => {
          setFilters({
            species: "",
            hobbie: "",
            personality: "",
            gender: "",
            rarity: "",
            status: "",
          });
          setCurrentSpeciesIndex(0);
        }}
      />

      {/* Loading */}
      {isLoading && (
        <div
          style={{
            textAlign: "center",
            margin: "80px auto",
            color: "var(--text)",
          }}
        >
          <div className="warning">Loading your stickers...</div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="warning">
          <span>
            There was a communication error with Dodo Airlines. Check your local
            connection!
          </span>
        </div>
      )}

      {/* Stickers found */}
      {!isLoading &&
        !isError &&
        (categories.length > 0 ? (
          <>
            <h2 className="chip">{currentPageCategory?.toUpperCase()}</h2>
            <div className="stickers">
              {stickersInPage.map((sticker) => {
                const isOwned = sticker.amount > 0;
                return (
                  <Sticker
                    key={sticker.number}
                    email={currentUserEmail}
                    number={sticker.number}
                    name={isOwned ? sticker.name : "???"}
                    gender={isOwned ? sticker.gender : "???"}
                    image={isOwned ? sticker.image_url : missingSticker}
                    description={
                      isOwned
                        ? `The ${sticker.hobbie.toLowerCase()} loving, ${sticker.personality} ${sticker.species}`
                        : "???"
                    }
                    amount={sticker.amount}
                    catchphrase={sticker.catchphrase}
                    personality={sticker.personality}
                    autograph={sticker.autograph}
                  />
                );
              })}
            </div>

            <div className="pagination">
              <div
                onClick={() =>
                  setCurrentSpeciesIndex((i) => Math.max(0, i - 1))
                }
                style={{
                  cursor: activeIndex === 0 ? "not-allowed" : "pointer",
                  opacity: activeIndex === 0 ? 0.5 : 1,
                }}
              >
                <img src={arrowLeft} alt="Voltar" />
              </div>

              <p>
                PAGE {activeIndex + 1} / {categories.length}
              </p>

              <div
                onClick={() =>
                  setCurrentSpeciesIndex((i) =>
                    Math.min(categories.length - 1, i + 1),
                  )
                }
                style={{
                  cursor:
                    activeIndex === categories.length - 1
                      ? "not-allowed"
                      : "pointer",
                  opacity: activeIndex === categories.length - 1 ? 0.5 : 1,
                }}
              >
                <img src={arrowRight} alt="Avançar" />
              </div>
            </div>
          </>
        ) : (
          // No stickers found
          <div className="warning">
            <h2>No stickers found!</h2>
          </div>
        ))}
    </main>
  );
}
