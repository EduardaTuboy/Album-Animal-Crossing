import { createFileRoute } from "@tanstack/react-router";
import "../styles/album.css";
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png";
import Sticker from "../components/sticker";
import missingSticker from "../assets/missing-sticker.png";

export const Route = createFileRoute("/album")({
  component: () => (
    <main>
      <h2 className="chip">Bird</h2>

      <div className="stickers">
        <Sticker
          name="Piper"
          gender="female"
          image={missingSticker}
          description="The peppy bird"
        />
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
