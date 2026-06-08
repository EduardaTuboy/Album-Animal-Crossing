import { createFileRoute } from "@tanstack/react-router";
import "./album.css";
import missingSticker from "../assets/missing-sticker.png";
import female from "../assets/female.png";
import male from "../assets/male.png";
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png";

export const Route = createFileRoute("/album")({
  component: () => (
    <main>
      <h2 className="chip">Bird</h2>

      <div className="stickers">
        <div className="sticker">
          <img src={missingSticker} alt="Missing Sticker" />
          <div className="card chip">
            <div className="name_gender">
              <h3>Piper</h3>
              <img src={female} alt="female"></img>
            </div>
            <p className="description">The peppy bird</p>
          </div>
        </div>
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
  ),
});
