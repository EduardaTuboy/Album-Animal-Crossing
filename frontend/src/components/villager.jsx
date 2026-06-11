import { useState } from "react";
import "../styles/villager.css";
import { skins, eyes, hairs } from "../villagerAssets";

function AttributeControl({ label, currentIndex, totalItems, setIndex }) {
  const nextItem = (current, total) => (current + 1) % total;
  const prevItem = (current, total) =>
    current === 0 ? total - 1 : current - 1;

  return (
    <div className="control-group">
      <button
        className="left"
        onClick={() => setIndex((prev) => prevItem(prev, totalItems))}
      >
        ◀
      </button>
      <span>
        {label} {currentIndex + 1}
      </span>
      <button
        className="right"
        onClick={() => setIndex((prev) => nextItem(prev, totalItems))}
      >
        ▶
      </button>
    </div>
  );
}

function AvatarLayer({ src, alt, color, blendMode }) {
  if (!color) return <img src={src} alt={alt} />;

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
  hairColor = "#442200",
  eyesColor = "#442200",
  setHairColor,
  setEyesColor,
}) {
  const avatarLayers = [
    {
      id: "skin",
      label: "Skin",
      assets: skins,
      index: skinIndex,
      setIndex: setSkinIndex,
    },
    {
      id: "eyes",
      label: "Eyes",
      assets: eyes,
      index: eyesIndex,
      setIndex: setEyesIndex,
      color: eyesColor,
      setColor: setEyesColor,
      blendMode: "color",
    },
    {
      id: "hair",
      label: "Hair",
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
              {layer.color &&
                (() => {
                  // Funções auxiliares de conversão
                  const hexToHsl = (hex) => {
                    let r = parseInt(hex.slice(1, 3), 16) / 255;
                    let g = parseInt(hex.slice(3, 5), 16) / 255;
                    let b = parseInt(hex.slice(5, 7), 16) / 255;
                    let max = Math.max(r, g, b),
                      min = Math.min(r, g, b);
                    let h,
                      s,
                      l = (max + min) / 2;

                    if (max === min) {
                      h = s = 0;
                    } else {
                      let d = max - min;
                      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                      switch (max) {
                        case r:
                          h = (g - b) / d + (g < b ? 6 : 0);
                          break;
                        case g:
                          h = (b - r) / d + 2;
                          break;
                        case b:
                          h = (r - g) / d + 4;
                          break;
                      }
                      h /= 6;
                    }
                    return {
                      h: Math.round(h * 360),
                      s: Math.round(s * 100),
                      l: Math.round(l * 100),
                    };
                  };

                  const hslToHex = (h, s, l) => {
                    l /= 100;
                    const a = (s * Math.min(l, 1 - l)) / 100;
                    const f = (n) => {
                      const k = (n + h / 30) % 12;
                      const color =
                        l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                      return Math.round(255 * color)
                        .toString(16)
                        .padStart(2, "0");
                    };
                    return `#${f(0)}${f(8)}${f(4)}`;
                  };

                  const { h, s, l } = hexToHsl(layer.color);

                  const updateHsl = (newH, newS, newL) => {
                    const hex = hslToHex(newH, newS, newL);
                    layer.setColor(hex);
                  };

                  return (
                    <div
                      className="hsl-picker-container"
                      style={{ "--current-color": layer.color }}
                    >
                      {/* Hue */}
                      <div className="slider-group">
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={h}
                          onChange={(e) =>
                            updateHsl(Number(e.target.value), s, l)
                          }
                          className="hsl-slider slider-hue"
                        />
                      </div>

                      {/* Saturation */}
                      <div className="slider-group">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={s}
                          onChange={(e) =>
                            updateHsl(h, Number(e.target.value), l)
                          }
                          className="hsl-slider slider-saturation"
                          style={{
                            backgroundImage: `linear-gradient(to right, hsl(${h}, 0%, ${l}%), hsl(${h}, 100%, ${l}%))`,
                          }}
                        />
                      </div>

                      {/* Lightness */}
                      <div className="slider-group">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={l}
                          onChange={(e) =>
                            updateHsl(h, s, Number(e.target.value))
                          }
                          className="hsl-slider slider-lightness"
                          style={{
                            backgroundImage: `linear-gradient(to right, hsl(${h}, ${s}%, 0%), hsl(${h}, ${s}%, 50%), hsl(${h}, ${s}%, 100%))`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
