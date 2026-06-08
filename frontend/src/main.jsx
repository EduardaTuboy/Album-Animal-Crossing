import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./styles/index.css";
import "./styles/header.css";
import "./styles/footer.css";

// Isso importa as rotas geradas automaticamente pelo plugin do Vite
import { routeTree } from "./routeTree.gen";

// Cria a instância do roteador
const router = createRouter({ routeTree });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
