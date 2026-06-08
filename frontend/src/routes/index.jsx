import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import unlockedImg from "../assets/unlocked.png";
import repeatingImg from "../assets/repeating.png";
import missingImg from "../assets/missing.png";

export const Route = createFileRoute("/")({
  component: DashboardStats,
});

function DashboardStats() {
  // Sticker status
  const [stats, setStats] = useState({
    unlocked: 0,
    repeating: 0,
    missing: 0,
    total: 0,
  });

  // Email test
  const currentUserEmail = "usuario@exemplo.com";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/stats/${currentUserEmail}`,
        );
        if (!response.ok) throw new Error("Falha ao buscar dados");

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [currentUserEmail]);

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

      {/* Progress Bar */}
      <div className="chip" id="total">
        <div
          id="bar"
          style={{
            width: `${(stats.unlocked / stats.total) * 100}%`,
            minWidth: "fit-content",
            backgroundColor: `hsl(${(stats.unlocked / stats.total) * 144}, 39%, 66%)`,
          }}
        >
          {stats.unlocked} / {stats.total}
        </div>
      </div>

      {/* Cards de estatísticas renderizados com os dados reais */}
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
  );
}
