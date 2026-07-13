import { useState } from "react";
import redd from "../assets/Redd.png";
import dialog1 from "../assets/Redd-dialogue-1.png";
import dialog2 from "../assets/Redd-dialogue-2.png";
import "../styles/redd.css";

function Redd() {
  const [dialogStep, setDialogStep] = useState(0);

  return (
    <div className="redd-container">
      {/* Dialogue 1 */}
      <button className="redd" onClick={() => setDialogStep(1)}>
        <img src={redd} alt="Redd" />
      </button>

      {/* Dialogue 2 */}
      {dialogStep === 1 && (
        <img
          src={dialog1}
          alt="Diálogo 1"
          className="redd-dialog"
          onClick={() => setDialogStep(2)}
        />
      )}

      {/* Dialogue 0 */}
      {dialogStep === 2 && (
        <img
          src={dialog2}
          alt="Diálogo 2"
          className="redd-dialog"
          onClick={() => setDialogStep(0)}
        />
      )}
    </div>
  );
}

export default Redd;
