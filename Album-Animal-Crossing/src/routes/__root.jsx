import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import leafIcon from "../assets/leaf-icon.png";
import loginIcon from "../assets/login.png";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
        {/* O Link substitui a tag <a> para não recarregar a página inteira */}
        <div id="logo">
          <img src={leafIcon} alt="Animal Crossing Logo" />
          <h1>Animal Crossing Album</h1>
        </div>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/album">My Album</Link>
          <Link to="/collection">Collection</Link>
          <div id="login">
            <img src={loginIcon} alt="Login icon" />
          </div>
        </div>
      </nav>

      {/* O Outlet é o "buraco" onde o conteúdo das outras páginas vai aparecer */}
      <Outlet />
    </>
  ),
});
