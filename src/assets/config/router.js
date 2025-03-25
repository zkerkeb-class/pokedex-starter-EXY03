import{ createBrowserRouter} from "react-router"
import PokedexNavigation from "../components/PokedexNavigation"
import PokemonDetails from "../components/PokemonDetails"; 

const router = createBrowserRouter([
    {
        path: "/",
        Component: PokedexNavigation
    },

    {
        path: "/pokemon/:id",
        Component: PokemonDetails
    }
])

export default router;