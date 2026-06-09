import { useState } from "react";
import "../styles/villager.css";

import skin1 from "../assets/custom_villager/skin1.png";
import skin2 from "../assets/custom_villager/skin2.png";
import skin3 from "../assets/custom_villager/skin3.png";
import skin4 from "../assets/custom_villager/skin4.png";
import skin5 from "../assets/custom_villager/skin5.png";
import skin6 from "../assets/custom_villager/skin6.png";
import skin7 from "../assets/custom_villager/skin7.png";
import skin8 from "../assets/custom_villager/skin8.png";
import eyes1 from "../assets/custom_villager/eyes1.png";
import eyes2 from "../assets/custom_villager/eyes2.png";
import eyes3 from "../assets/custom_villager/eyes3.png";
import eyes4 from "../assets/custom_villager/eyes4.png";
import eyes5 from "../assets/custom_villager/eyes5.png";
import eyes6 from "../assets/custom_villager/eyes6.png";
import eyes7 from "../assets/custom_villager/eyes7.png";
import eyes8 from "../assets/custom_villager/eyes8.png";
import hair1 from "../assets/custom_villager/hair1.png";
import hair2 from "../assets/custom_villager/hair2.png";
import hair3 from "../assets/custom_villager/hair3.png";
import hair4 from "../assets/custom_villager/hair4.png";
import hair5 from "../assets/custom_villager/hair5.png";
import hair6 from "../assets/custom_villager/hair6.png";
import hair7 from "../assets/custom_villager/hair7.png";
import hair8 from "../assets/custom_villager/hair8.png";

const skins = [skin1, skin2, skin3, skin4, skin5, skin6, skin7, skin8];
const eyes = [eyes1, eyes2, eyes3, eyes4, eyes5, eyes6, eyes7, eyes8];
const hairs = [hair1, hair2, hair3, hair4, hair5, hair6, hair7, hair8];

function AttributeControl({ label, currentIndex, totalItems, setIndex }) {
  const nextItem = (current, total) => (current + 1) % total;
  const prevItem = (current, total) =>
    current === 0 ? total - 1 : current - 1;

  return (
    <div className="control-group">
      <button onClick={() => setIndex((prev) => prevItem(prev, totalItems))}>
        ◀
      </button>
      <span>
        {label} {currentIndex + 1}
      </span>
      <button onClick={() => setIndex((prev) => nextItem(prev, totalItems))}>
        ▶
      </button>
    </div>
  );
}

export default function Villager({
  size = "200px",
  skinIndex = 0,
  eyesIndex = 0,
  hairIndex = 0,
  editable = false,
  setSkinIndex,
  setEyesIndex,
  setHairIndex,
}) {
  const containerStyle = {
    width: size,
    height: size,
  };

  return (
    <div className="villager-container">
      <div className="villager-avatar" style={containerStyle}>
        <img src={skins[skinIndex]} alt="skin" />
        <img src={eyes[eyesIndex]} alt="eyes" />
        <img src={hairs[hairIndex]} alt="hair" />
      </div>

      {editable && (
        <div className="villager-controls">
          <AttributeControl
            label="Pele"
            currentIndex={skinIndex}
            totalItems={skins.length}
            setIndex={setSkinIndex}
          />
          <AttributeControl
            label="Olhos"
            currentIndex={eyesIndex}
            totalItems={eyes.length}
            setIndex={setEyesIndex}
          />
          <AttributeControl
            label="Cabelo"
            currentIndex={hairIndex}
            totalItems={hairs.length}
            setIndex={setHairIndex}
          />
        </div>
      )}
    </div>
  );
}
