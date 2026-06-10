import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Villager from "../components/villager.jsx";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [skin, setSkin] = useState(0);
  const [eyes, setEyes] = useState(0);
  const [hair, setHair] = useState(0);
  const [hairColor, setHairColor] = useState("#442200");
  const [eyesColor, setEyesColor] = useState("#442200");

  return (
    <main>
      <h2>Customize your apearence!</h2>

      <Villager
        size="250px"
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
    </main>
  );
}
