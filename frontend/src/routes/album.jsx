import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "../styles/album.css";
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png";
import Sticker from "../components/sticker";
import missingSticker from "../assets/missing-sticker.png";

export const Route = createFileRoute("/album")({
  component: Album,
});

function Album() {
  const [stickers, setStickers] = useState([]);
  const currentUserEmail = "usuario@exemplo.com";
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/album/${currentUserEmail}`,
        );
        if (!response.ok) throw new Error("Erro ao carregar dados do álbum");

        const data = await response.json();
        setStickers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbum();
  }, [currentUserEmail]);

  return (
    <main>
      <h2 className="chip">Bird</h2>

      <div className="stickers">
        {stickers.map((sticker) => {
          // Verifica se o usuário tem a figurinha (quantidade maior que 0)
          const isOwned = sticker.amount > 0;

          return (
            <Sticker
              key={sticker.number}
              name={isOwned ? sticker.name : "???"}
              gender={isOwned ? sticker.gender : "???"}
              image={isOwned ? sticker.image_url : missingSticker}
              description={
                isOwned
                  ? `The ${sticker.personality} ${sticker.species}`
                  : "???"
              }
              amount={sticker.amount} // Corrigido de 'amout' para 'amount' e passando o valor dinâmico
            />
          );
        })}
      </div>

      <div className="pagination">
        <div>
          <img src={arrowLeft} alt="arrowLeft" />
        </div>
        <p>01 / 04</p>
        <div>
          <img src={arrowRight} alt="arrowRight" />
        </div>
      </div>
    </main>
  );
}
