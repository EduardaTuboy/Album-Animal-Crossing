import { useState } from "react";
import "../styles/villager.css";
import { skins, eyes, hairs } from "../villagerAssets";

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

// NOVO: Sub-componente que gerencia o blend mode e a máscara de forma genérica
function AvatarLayer({ src, alt, color, blendMode }) {
  if (!color) return <img src={src} alt={alt} />; // Retorna imagem normal para a pele

  return (
    <div className="blend-container">
      <img src={src} alt={alt} />
      <div
        className="color-overlay"
        style={{
          backgroundColor: color,
          mixBlendMode: blendMode,
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
        }}
      />
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
  hairColor = "#ff0000",
  eyesColor = "#0000ff",
  setHairColor,
  setEyesColor,
}) {
  // A MÁGICA: Centraliza as propriedades de cada parte do boneco em uma estrutura de dados
  const avatarLayers = [
    {
      id: "skin",
      label: "Pele",
      assets: skins,
      index: skinIndex,
      setIndex: setSkinIndex,
    },
    {
      id: "eyes",
      label: "Olhos",
      assets: eyes,
      index: eyesIndex,
      setIndex: setEyesIndex,
      color: eyesColor,
      setColor: setEyesColor,
      blendMode: "color",
    },
    {
      id: "hair",
      label: "Cabelo",
      assets: hairs,
      index: hairIndex,
      setIndex: setHairIndex,
      color: hairColor,
      setColor: setHairColor,
      blendMode: "screen",
    },
  ];

  return (
    <div className="villager-container">
      {/* Renderização das camadas do avatar reduzida para 1 bloco dinâmico */}
      <div className="villager-avatar" style={{ width: size, height: size }}>
        {avatarLayers.map((layer) => (
          <AvatarLayer
            key={layer.id}
            src={layer.assets[layer.index]}
            alt={layer.id}
            color={layer.color}
            blendMode={layer.blendMode}
          />
        ))}
      </div>

      {/* Interface de customização dinâmica */}
      {editable && (
        <div className="villager-controls">
          {avatarLayers.map((layer) => (
            <div key={layer.id} className={layer.color ? "control-row" : ""}>
              <AttributeControl
                label={layer.label}
                currentIndex={layer.index}
                totalItems={layer.assets.length}
                setIndex={layer.setIndex}
              />
              {layer.color && (
                <input
                  type="color"
                  value={layer.color}
                  onChange={(e) => layer.setColor(e.target.value)}
                  className="color-picker"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
