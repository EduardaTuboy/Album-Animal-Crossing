import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Villager from "../components/villager.jsx";
import { useUpdateAvatar, useUserProfile } from "../api/usersQueries.js"; // Importe o novo hook
import "../styles/login.css";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [skin, setSkin] = useState(0);
  const [eyes, setEyes] = useState(0);
  const [hair, setHair] = useState(0);
  const [hairColor, setHairColor] = useState("#442200");
  const [eyesColor, setEyesColor] = useState("#442200");

  const userEmail = "usuario@exemplo.com";

  // DB search
  const { data: profile } = useUserProfile(userEmail);

  // update the state when the profile data is fetched
  useEffect(() => {
    if (profile) {
      if (profile.skin_index !== undefined) setSkin(Number(profile.skin_index));
      if (profile.eyes_index !== undefined) setEyes(Number(profile.eyes_index));
      if (profile.hair_index !== undefined) setHair(Number(profile.hair_index));
      if (profile.hair_color) setHairColor(profile.hair_color);
      if (profile.eyes_color) setEyesColor(profile.eyes_color);
    }
  }, [profile]);

  const { mutate: saveAvatar, isPending } = useUpdateAvatar(); //

  const handleSave = () => {
    saveAvatar({
      email: userEmail,
      skinIndex: skin,
      eyesIndex: eyes,
      hairIndex: hair,
      hairColor: hairColor,
      eyesColor: eyesColor,
    });
  };

  return (
    <main>
      <h2>Customize your appearance!</h2>
      <Villager
        size="300px"
        skinIndex={skin}
        eyesIndex={eyes}
        hairIndex={hair}
        editable={true}
        setSkinIndex={setSkin}
        setEyesIndex={setEyes}
        setHairIndex={setHair}
        hairColor={hairColor}
        setHairColor={setHairColor}
        eyesColor={eyesColor}
        setEyesColor={setEyesColor}
      />
      <div className="save-avatar">
        {" "}
        <button onClick={handleSave} disabled={isPending}>
          {" "}
          {isPending ? "Salvando..." : "Salvar Configuração"}
        </button>{" "}
      </div>{" "}
    </main>
  );
}
