import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { updatePokemon } from "../services/api";

const EditPokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [pokemonData, setPokemonData] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    spAttack: 0,
    spDefense: 0,
    speed: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Récupérer les données du Pokémon au chargement du composant
  useEffect(() => {
    axios.get(`http://localhost:3000/api/pokemons/${id}`)
      .then((response) => {
        const pokemon = response.data;
        setPokemonData({
          name: pokemon.name.french || "",
          hp: pokemon.base?.hp || 0,
          attack: pokemon.base?.attack || 0,
          defense: pokemon.base?.defense || 0,
          spAttack: pokemon.base?.specialAttack || 0,
          spDefense: pokemon.base?.specialDefense || 0,
          speed: pokemon.base?.speed || 0,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Erreur de chargement du Pokémon");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokemonData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updatedData = {
        name: { 
          french: pokemonData.name 
        },
        stats: {
          hp: parseInt(pokemonData.hp),
          attack: parseInt(pokemonData.attack),
          defense: parseInt(pokemonData.defense),
          specialAttack: parseInt(pokemonData.spAttack),
          specialDefense: parseInt(pokemonData.spDefense), 
          speed: parseInt(pokemonData.speed),
        }
      };
  
      const response = await updatePokemon(id, updatedData);
  
      if (response) {
        alert("Pokémon mis à jour !");
        navigate(`/pokedex`);
      } else {
        setError("Erreur lors de la mise à jour du Pokémon");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du Pokémon:", error);
      setError("Erreur lors de la mise à jour du Pokémon: " + (error.message || error));
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>

<button
        onClick={() => navigate(-1)}
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
      <h1>Modifier le Pokémon</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={pokemonData.name}
          onChange={handleChange}
          placeholder="Nom"
          required
        />
        <input
          type="number"
          name="hp"
          value={pokemonData.hp}
          onChange={handleChange}
          placeholder="HP"
          required
        />
        <input
          type="number"
          name="attack"
          value={pokemonData.attack}
          onChange={handleChange}
          placeholder="Attack"
          required
        />
        <input
          type="number"
          name="defense"
          value={pokemonData.defense}
          onChange={handleChange}
          placeholder="Defense"
          required
        />
        <input
          type="number"
          name="spAttack"
          value={pokemonData.specialAttack}
          onChange={handleChange}
          placeholder="Sp. Attack"
          required
        />
        <input
          type="number"
          name="spDefense"
          value={pokemonData.spDefense}
          onChange={handleChange}
          placeholder="Sp. Defense"
          required
        />
        <input
          type="number"
          name="speed"
          value={pokemonData.speed}
          onChange={handleChange}
          placeholder="Speed"
          required
        />

        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
};

export default EditPokemon;
