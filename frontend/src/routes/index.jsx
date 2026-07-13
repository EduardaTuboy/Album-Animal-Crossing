import { createFileRoute } from "@tanstack/react-router";
import unlockedImg from "../assets/unlocked.png";
import repeatingImg from "../assets/repeating.png";
import missingImg from "../assets/missing.png";
import { useStats } from "../api/stickersQueries.js";
import Redd from "../components/redd.jsx";

export const Route = createFileRoute("/")({
  component: DashboardStats,
});

function DashboardStats() {
  const currentUserEmail = "usuario@exemplo.com";
  const { data: stats = { unlocked: 0, repeating: 0, missing: 0, total: 0 } } =
    useStats(currentUserEmail);

  const total = stats.total || 1;
  const percentage = Math.round((stats.unlocked / total) * 100);

  const statsList = [
    {
      id: "unlocked",
      imgSrc: unlockedImg,
      title: "Unlocked",
      value: stats.unlocked,
    },
    {
      id: "repeating",
      imgSrc: repeatingImg,
      title: "Repeating",
      value: stats.repeating,
    },
    {
      id: "missing",
      imgSrc: missingImg,
      title: "Missing",
      value: stats.missing,
    },
  ];

  return (
    <main>
      <h2 className="chip">Statistics</h2>

      <div className="chip" id="total">
        <div
          id="bar"
          style={{
            width: `${percentage}%`,
            minWidth: "fit-content",
            backgroundColor: `hsl(${percentage * 1.44}, 39%, 66%)`,
          }}
        >
          {stats.unlocked} / {stats.total}
        </div>
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
      <Redd email={currentUserEmail} />
    </main>
  );
}
