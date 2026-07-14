import { useState } from "react";
import card from "../assets/unlocked.png";
import redd from "../assets/Redd.png";
import dialog1 from "../assets/Redd-dialogue-1.png";
import dialog2 from "../assets/Redd-dialogue-2.png";
import "../styles/redd.css";

// 1. Import New Animation Frames (Assuming they are in assets/)
import stickerAnim0 from "../assets/new_stickers0.png";
import stickerAnim1 from "../assets/new_stickers1.png";
import stickerAnim2 from "../assets/new_stickers2.png";
import stickerAnim3 from "../assets/new_stickers3.png";
import stickerAnim4 from "../assets/new_stickers4.png";
import stickerAnim5 from "../assets/new_stickers5.png";
import stickerAnim6 from "../assets/new_stickers6.png";

import { useUserProfile, useClaimCard } from "../api/usersQueries.js";

// Helper function to create a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Redd({ email }) {
  const [dialogStep, setDialogStep] = useState(0);

  // 2. New State Variables for Animation
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(false);
  const [currentAnimationFrame, setCurrentAnimationFrame] = useState(0);

  // Put animation frames into an array for easy access
  const animationFrames = [
    stickerAnim0,
    stickerAnim1,
    stickerAnim2,
    stickerAnim3,
    stickerAnim4,
    stickerAnim5,
    stickerAnim6,
  ];

  const { data: userProfile, isLoading: isProfileLoading } =
    useUserProfile(email);
  const availableCards = userProfile?.acumulated_cards || 0;

  const claimCardMutation = useClaimCard();

  // 3. Modified handleClaimCard
  const handleClaimCard = async () => {
    if (availableCards > 0 && !claimCardMutation.isPending) {
      // I. Show the dark-green overlay
      setShowOpeningAnimation(true);
      const stickersGanhos = [];

      // II. Configuration: duration for each frame (in milliseconds)
      // "some tenths of a second" - let's use 150ms per frame
      const frameDelay = 150;

      try {
        // III. Play the entire animation (0 to 6) sequencially
        // We wait for each frame to complete before showing the next.
        for (let f = 0; f < animationFrames.length; f++) {
          setCurrentAnimationFrame(f);
          await delay(frameDelay); // Wait 150ms per frame
        }

        // IV. After the animation finishes, claim all cards in sequence
        for (let i = 0; i < availableCards; i++) {
          const data = await claimCardMutation.mutateAsync(email);
          stickersGanhos.push(
            `Figurinha ${data.sticker.number} (${data.rarityDrawn})`,
          );
        }
      } catch (error) {
        alert(
          error.message || "Houve um erro ao resgatar algumas de suas cartas.",
        );
      } finally {
        // VI. Hide the overlay in all cases
        setShowOpeningAnimation(false);
        setDialogStep(0);
      }
    }
  };

  return (
    <div className="redd-container">
      {/* 4. Conditional Rendering of the Animation Overlay */}
      {showOpeningAnimation && (
        <div className="animation-overlay">
          <img
            src={animationFrames[currentAnimationFrame]}
            alt="Opening present"
            className="animation-frame"
          />
        </div>
      )}

      <div className="cards">
        {availableCards > 1 && <div className="badge">{availableCards}</div>}
        {availableCards > 0 && <img src={card} alt="Card" />}
      </div>

      <button
        onClick={() => setDialogStep(1)}
        disabled={
          claimCardMutation.isPending ||
          isProfileLoading ||
          showOpeningAnimation
        }
      >
        <img src={redd} alt="Redd" />
      </button>

      {dialogStep === 1 && (
        <img src={dialog1} alt="Dialogue 1" onClick={() => setDialogStep(2)} />
      )}

      {dialogStep === 2 && (
        <img
          src={dialog2}
          alt="Dialogue 2"
          onClick={handleClaimCard}
          style={{
            cursor:
              claimCardMutation.isPending || showOpeningAnimation
                ? "not-allowed"
                : "pointer",
          }}
        />
      )}
    </div>
  );
}

export default Redd;
