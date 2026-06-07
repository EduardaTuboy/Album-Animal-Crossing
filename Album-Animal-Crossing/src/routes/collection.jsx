import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/collection")({
  component: () => (
    <div>
      <h1>Bem-vindo ao collection!</h1>
    </div>
  ),
});
