import { createFileRoute } from "@tanstack/react-router";
import unlocked from "../assets/unlocked.png";
import repeating from "../assets/repeating.png";
import missing from "../assets/missing.png";

export const Route = createFileRoute("/")({
  component: () => (
    <main>
      <h2 className="chip">Statistics</h2>
      <div className="chip" id="total">
        <div id="bar">302/412</div>
      </div>
      <div className="stats">
        <div>
          <img src={unlocked} alt="Unlocked" />
          <div className="chip">
            <h3>Unlocked</h3>
            <p>302</p>
          </div>
        </div>

        <div>
          <img src={repeating} alt="Repeating" />
          <div className="chip">
            <h3>Repeating</h3>
            <p>55</p>
          </div>
        </div>

        <div>
          <img src={missing} alt="Missing" />
          <div className="chip">
            <h3>Missing</h3>
            <p>110</p>
          </div>
        </div>
      </div>
    </main>
  ),
});
