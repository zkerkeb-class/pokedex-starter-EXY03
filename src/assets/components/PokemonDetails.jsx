import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

const PokemonDetails = () => {
    const [pokemon, setPokemon] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

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
                navigate("/"); // Rediriger vers la page d'accueil
            })
            .catch((error) => {
                alert("Erreur lors de la suppression du Pokémon");
                console.error("Erreur:", error);
            });
    };

    return (
        <div>
            <h1>Pokémon {id}</h1>
            <p>{pokemon.name?.french}</p>
            <button onClick={deletePokemon} className="delete-button">
                Supprimer le Pokémon
            </button>
        </div>
    );
};

export default PokemonDetails;
