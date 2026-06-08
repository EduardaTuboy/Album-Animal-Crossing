import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import leafIcon from "../assets/leaf-icon.png";
import loginIcon from "../assets/login.png";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <div id="logo">
          <img src={leafIcon} alt="Animal Crossing Logo" />
          <h1>Animal Crossing Album</h1>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/album">My Album</Link>
          <Link to="/collection">Collection</Link>
          <div id="login">
            <img src={loginIcon} alt="Login icon" />
          </div>
        </nav>
      </header>

      <Outlet />

      <footer>
        <p> © 2026 Eduarda Tuboy. Todos os direitos reservados.</p>
        <p>Agradecimento a Visio.ai pela oportunidade :)</p>
        <p> Créditos:</p>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://www.figma.com/community/file/1155196388062943961"
            >
              {" "}
              Figma por onde a UI foi tirada
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://catwithmonocle.com/news/2020/02/06/animal-crossing-new-horizons-nook-pattern-wallpaper/"
            >
              linkedin.com/in/ katherine-manalo manaloka.com Wallpaper
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://animalcrossing.fandom.com/wiki/Villager_list_(New_Horizons)"
            >
              Imagens e informações do villagers:
            </a>
          </li>
        </ul>
      </footer>
    </>
  ),
});
