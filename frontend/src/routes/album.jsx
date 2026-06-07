import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/album")({
  component: () => (
    <main>
      <h2 className="chip">Bird</h2>
      <div className="sticker">
        <img src="assets/bird.png" alt="Bird" />
      </div>
    </main>
  ),
});
