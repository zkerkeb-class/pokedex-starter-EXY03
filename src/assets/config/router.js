import{ createBrowserRouter} from "react-router"
import PokedexNavigation from "../../pages/PokedexNavigation"
import PokemonDetails from "../../pages/PokemonDetails"; 
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import EditPokemon from "../../pages/EditPokemon";
import Flappy from "../../pages/Flappy";

const router = createBrowserRouter([
    {
      path: "/",
      Component: PokedexNavigation
    },
    {
        path: "/login", 
        Component: Login 
      },
    {
        path: "/register", 
        Component: Register 
      },
    {
      path: "/pokedex", 
      Component: PokedexNavigation
    },
    {
        path: "/pokemon/:id",
        Component: PokemonDetails
    },
    {
        path: "/pokemon/:id/edit",
        Component: EditPokemon
    },
    {
        path: "/pokemon/:id/flappy",
        Component: Flappy
    },
  ]);
  
  export default router;
  