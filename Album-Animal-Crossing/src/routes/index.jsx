import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      <h1>Bem-vindo ao Dashboard!</h1>
      <p>Aqui ficarão as estatísticas da sua coleção.</p>
    </div>
  ),
});
