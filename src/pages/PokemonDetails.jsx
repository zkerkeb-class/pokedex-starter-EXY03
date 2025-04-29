import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { pokemonImages } from '../assets/imageLibrary';

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/pokemons/${id}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        alert("Erreur lors de la récupération du Pokémon");
        console.error("Erreur:", error);
      });
  }, [id]);

  const deletePokemon = () => {
    axios.delete(`http://localhost:3000/api/pokemons/${id}`)
      .then(() => {
        alert("Le Pokémon a été supprimé !");
        navigate("/pokedex");
      })
      .catch((error) => {
        alert("Erreur lors de la suppression du Pokémon");
        console.error("Erreur:", error);
      });
  };

  const modifyPokemon = () => {
    navigate(`/pokemon/${id}/edit`);
  };

  const playFlappy = () => {
    navigate(`/pokemon/${id}/flappy`); // on passe aussi l'id du pokémon pour l'utiliser dans Flappy
  };

  return (
    <div>
      {/* Bouton Retour */}
      <button
        onClick={() => navigate("/pokedex")}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "8px 12px",
          backgroundColor: "orange",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        ← Retour
      </button>
      <h1>Pokémon {id}</h1>
      <p>{pokemon.name?.french}</p>
            <div className="pokemon-image-container">
              <img 
                src={pokemonImages[pokemon.id]} 
                className="pokemon-image" 
              />
            </div>

    <div>
    {role === "admin" && (
      <button onClick={deletePokemon} className="delete-button">
        Supprimer le Pokémon
      </button>
      )}

      {role === "admin" && (
        <button onClick={modifyPokemon} className="delete-button">
          Modifier le Pokémon
        </button>
      )}

      <button onClick={playFlappy} className="play-button">
        Jouer à Flappy Bird avec ce Pokémon
      </button>
      </div>
      </div>
  );
};

export default PokemonDetails;
