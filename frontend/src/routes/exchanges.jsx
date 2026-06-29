import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Villager from "../components/villager.jsx";
import Sticker from "../components/sticker.jsx";
import "../styles/exchanges.css";

export const Route = createFileRoute("/exchanges")({
  component: Exchanges,
});

function Exchanges() {
  const currentUserEmail = "usuario@exemplo.com";

  const mockExchanges = [
    {
      id: 1,
      userName: "Duds",
      userAvatar: {
        skin: 1,
        eyes: 17,
        hair: 17,
        glasses: 0,
        beard: 0,
        hairColor: "#000000",
        eyesColor: "#000000",
      },
      stickers: [
        {
          number: 4,
          name: "Piper",
          species: "bird",
          personality: "peppy",
          hobbie: "Play",
          amount: 1,
          image_url:
            "https://static.wikia.nocookie.net/animalcrossing/images/4/47/NH-Piper_poster.png/revision/latest/scale-to-width-down/100?cb=20200522185742",
        },
        {
          number: 12,
          name: "Marlo",
          species: "hamster",
          personality: "cranky",
          hobbie: "Education",
          amount: 2,
          image_url:
            "https://static.wikia.nocookie.net/animalcrossing/images/0/03/NH-Marlo_poster.png/revision/latest/scale-to-width-down/100?cb=20211109151649",
        },
      ],
    },
    {
      id: 2,
      userName: "Mo",
      userAvatar: {
        skin: 3,
        eyes: 3,
        hair: 6,
        glasses: 1,
        beard: 1,
        hairColor: "#442200",
        eyesColor: "#442200",
      },
      stickers: [
        {
          number: 27,
          name: "Pierce",
          species: "eagle",
          personality: "jock",
          hobbie: "Fitness",
          amount: 3,
          image_url:
            "https://static.wikia.nocookie.net/animalcrossing/images/8/8f/NH-Pierce_poster.png/revision/latest/scale-to-width-down/100?cb=20200410191226",
        },
      ],
    },
  ];

  return (
    <main>
      <div className="exchanges-list">
        {mockExchanges.map((exchange) => (
          <div key={exchange.id} className="exchange-row">
            <div className="speech-bubble-wrapper">
              <div className="speech-bubble">
                <div className="exchange-stickers-grid">
                  {exchange.stickers.map((sticker) => (
                    <Sticker
                      key={sticker.number}
                      email={currentUserEmail}
                      number={sticker.number}
                      name={sticker.name}
                      gender="female"
                      image={sticker.image_url}
                      description={`The ${sticker.hobbie.toLowerCase()} loving, ${sticker.personality} ${sticker.species}`}
                      amount={sticker.amount}
                      catchphrase=""
                      personality={sticker.personality}
                      autograph={false}
                    />
                  ))}
                </div>
              </div>
              <div className="speech-bubble-arrow"></div>
            </div>

            <div className="user-profile-column">
              <Villager
                size="200px"
                skinIndex={exchange.userAvatar.skin}
                eyesIndex={exchange.userAvatar.eyes}
                hairIndex={exchange.userAvatar.hair}
                glassesIndex={exchange.userAvatar.glasses}
                beardIndex={exchange.userAvatar.beard}
                editable={false}
                hairColor={exchange.userAvatar.hairColor}
                eyesColor={exchange.userAvatar.eyesColor}
              />
              <span className="user-name-label">{exchange.userName}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
