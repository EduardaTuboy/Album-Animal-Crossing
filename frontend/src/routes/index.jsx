import { createFileRoute } from "@tanstack/react-router";
import unlocked from "../assets/unlocked.png";
import repeating from "../assets/repeating.png";
import missing from "../assets/missing.png";

const statsList = [
  { id: "unlocked", imgSrc: unlocked, title: "Unlocked", value: 302 },
  { id: "repeating", imgSrc: repeating, title: "Repeating", value: 55 },
  { id: "missing", imgSrc: missing, title: "Missing", value: 110 },
];

export const Route = createFileRoute("/")({
  component: () => (
    <main>
      <h2 className="chip">Statistics</h2>
      <div className="chip" id="total">
        <div id="bar">302 / 412</div>
      </div>
      <div className="stats">
        {statsList.map((stat) => (
          <div key={stat.id}>
            <img src={stat.imgSrc} alt={stat.title} />
            <div className="chip">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  ),
});
