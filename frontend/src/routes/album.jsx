import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import '../styles/album.css';
import arrowLeft from '../assets/arrow-left.png';
import arrowRight from '../assets/arrow-right.png';
import Sticker from '../components/sticker';
import missingSticker from '../assets/missing-sticker.png';
import { useAlbum } from '../api/stickersQueries.js';

export const Route = createFileRoute('/album')({
  component: Album,
});

function Album() {
  const [currentSpeciesIndex, setCurrentSpeciesIndex] = useState(0);
  const currentUserEmail = 'usuario@exemplo.com';
  const { data: stickers = [] } = useAlbum(currentUserEmail);

  const categories = Array.from(new Set(stickers.map((s) => s.species))).sort();
  const currentPageCategory = categories[currentSpeciesIndex];

  const stickersInPage = stickers
    .filter((s) => s.species === currentPageCategory)
    .sort((a, b) => a.number - b.number);

  return (
    <main>
      <h2 className="chip">
        {currentPageCategory?.toUpperCase() || 'CARREGANDO...'}
      </h2>
      <div className="stickers">
        {stickersInPage.map((sticker) => {
          const isOwned = sticker.amount > 0;
          return (
            <Sticker
              key={sticker.number}
              number={sticker.number}
              name={isOwned ? sticker.name : '???'}
              gender={isOwned ? sticker.gender : '???'}
              image={isOwned ? sticker.image_url : missingSticker}
              description={
                isOwned
                  ? `The ${sticker.hobbie.toLowerCase()} loving, ${sticker.personality} ${sticker.species}`
                  : '???'
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
          onClick={() => setCurrentSpeciesIndex((i) => Math.max(0, i - 1))}
          disabled={currentSpeciesIndex === 0}
        >
          <img src={arrowLeft} alt="Voltar" />
        </div>

        <p>
          PAGE {currentSpeciesIndex + 1} / {categories.length}
        </p>

        <div
          onClick={() =>
            setCurrentSpeciesIndex((i) =>
              Math.min(categories.length - 1, i + 1),
            )
          }
          disabled={currentSpeciesIndex === categories.length - 1}
        >
          <img src={arrowRight} alt="Avançar" />
        </div>
      </div>
    </main>
  );
}
