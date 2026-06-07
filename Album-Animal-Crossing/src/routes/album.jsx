import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/album")({
  component: () => <div>Página com as figurinhas do Álbum</div>,
});
