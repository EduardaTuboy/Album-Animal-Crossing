import { useState, useEffect } from "react";
import "../styles/modal.css";
import "../styles/index.css";

const listaEspecies = [
  "alligator",
  "anteater",
  "bear",
  "bird",
  "bull",
  "cat",
  "chicken",
  "cow",
  "cub",
  "deer",
  "dog",
  "duck",
  "eagle",
  "elephant",
  "frog",
  "goat",
  "gorilla",
  "hamster",
  "hippo",
  "horse",
  "kangaroo",
  "koala",
  "lion",
  "monkey",
  "mouse",
  "octopus",
  "ostrich",
  "penguin",
  "pig",
  "rabbit",
  "rhino",
  "sheep",
  "squirrel",
  "tiger",
  "wolf",
];

export function StickerModal({ isOpen, onClose, onSave, editingSticker }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [personality, setPersonality] = useState("");
  const [rarity, setRarity] = useState("");
  const [total, setTotal] = useState("");
  const [url, setUrl] = useState("");
  const [birthday, setBirthday] = useState("");
  const [catchphrase, setCatchphrase] = useState("");
  const [hobbie, setHobbie] = useState("");

  useEffect(() => {
    if (editingSticker) {
      setName(editingSticker.name || "");
      setGender(editingSticker.gender || "");
      setSpecies(editingSticker.species || "");
      setRarity(editingSticker.rarity || "");
      setTotal(editingSticker.total?.toString() || "");
      setUrl(editingSticker.url || "");
      setBirthday(
        editingSticker.birthday ? editingSticker.birthday.split("T")[0] : "",
      );
      setCatchphrase(editingSticker.catchphrase || "");
      setHobbie(editingSticker.hobbie || "");

      if (editingSticker.personality) {
        const p = editingSticker.personality;
        const personalidadeFormatada =
          p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
        setPersonality(personalidadeFormatada);
      } else {
        setPersonality("");
      }
    } else {
      setName("");
      setGender("");
      setSpecies("");
      setPersonality("");
      setRarity("");
      setTotal("");
      setUrl("");
      setBirthday("");
      setCatchphrase("");
      setHobbie("");
    }
  }, [editingSticker, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      gender,
      species,
      personality,
      rarity,
      total: parseInt(total) || 0,
      url,
      catchphrase,
      hobbie,
      birthday: birthday
        ? `2000-${birthday.split("-")[1]}-${birthday.split("-")[2]}`
        : null,
    });
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h3>{editingSticker ? "Edit Sticker" : "Create New Sticker"}</h3>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="input-label">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* URL */}
          <div className="input-label">
            <label>Image URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* BIRTHDAY */}
          <div className="input-label">
            <label>Birthday</label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              min="2000-01-01"
              max="2000-12-31"
              required
            />
          </div>

          {/* CATCHPHRASE */}
          <div className="input-label">
            <label>Catchphrase</label>
            <input
              type="text"
              value={catchphrase}
              onChange={(e) => setCatchphrase(e.target.value)}
              placeholder="Ex: snorty"
            />
          </div>

          {/* GENDER */}
          <div className="input-label">
            <label>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* SPECIES */}
          <div className="input-label">
            <label>Species</label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              required
            >
              <option value="">Select Species</option>
              {listaEspecies.map((esp) => (
                <option key={esp} value={esp}>
                  {esp.charAt(0).toUpperCase() + esp.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* PERSONALITY */}
          <div className="input-label">
            <label>Personality</label>
            <select
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              required
            >
              <option value="">Select Personality</option>
              <option value="Jock">Jock</option>
              <option value="Cranky">Cranky</option>
              <option value="Smug">Smug</option>
              <option value="Lazy">Lazy</option>
              <option value="Normal">Normal</option>
              <option value="Peppy">Peppy</option>
              <option value="Snooty">Snooty</option>
              <option value="Sisterly">Sisterly</option>
            </select>
          </div>

          {/* HOBBIE */}
          <div className="input-label">
            <label>Hobbie</label>
            <select value={hobbie} onChange={(e) => setHobbie(e.target.value)}>
              <option value="">Select Hobbie</option>
              <option value="Nature">Nature</option>
              <option value="Education">Education</option>
              <option value="Fitness">Fitness</option>
              <option value="Play">Play</option>
              <option value="Fashion">Fashion</option>
              <option value="Music">Music</option>
            </select>
          </div>

          {/* RARITY */}
          <div className="input-label">
            <label>Rarity</label>
            <select
              value={rarity}
              onChange={(e) => setRarity(e.target.value)}
              required
            >
              <option value="">Select Rarity</option>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>

          {/* TOTAL */}
          <div className="input-label">
            <label>Total</label>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              min="0"
              required
            />
          </div>

          <div className="modal-actions">
            <button id="cancel" type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
