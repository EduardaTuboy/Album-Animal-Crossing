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
      />
    </main>
  );
}
