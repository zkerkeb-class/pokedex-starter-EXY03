import { pokemonImages } from '../assets/imageLibrary';
import { pokemonShinyImages } from '../assets/imageLibrary';
import { typeImages } from '../assets/typesLibrary';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';  
import axios from 'axios';  // Assure-toi d'importer axios

function PokemonCard({ pokemon }) {
  const [isShiny, setIsShiny] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);  // État pour savoir si le Pokémon est un favori
  const navigate = useNavigate();

  const toggleShiny = () => {
    setIsShiny(!isShiny);
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const favorites = response.data.favoritePokemons || [];
        setIsFavorite(favorites.includes(pokemon.id));
      } catch (err) {
        console.error('Erreur chargement favoris:', err);
      }
    };

    checkFavoriteStatus();
  }, [pokemon.id]);

  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
  
      const response = await axios.put(
        '/api/auth/favorites',
        { pokemonId: pokemon.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Utilise directement la réponse du backend
      setIsFavorite(response.data.isFavorite); // ⚠️ Important : utilise response.data.isFavorite
      
    } catch (error) {
      console.error('Erreur:', error.response?.data || error.message);
    }
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-name" style={{ position: 'relative' }}>
        <h2>{pokemon.name.french}</h2>

        {/* Bouton cœur en haut à droite */}
        <button
          onClick={toggleFavorite}
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: isFavorite ? 'red' : 'black',
            padding: '0',  
            width: '20px',  // Largeur 
            height: '20px',  // Hauteur
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="pokemon-image-container">
        <img 
          src={isShiny ? pokemonShinyImages[pokemon.id] : pokemonImages[pokemon.id]} 
          alt={pokemon.name.english} 
          className="pokemon-image" 
        />
        <button 
          onClick={toggleShiny}
          className="shiny-button"
          aria-label="Basculer version shiny"
        >
          ⭐
        </button>
      </div>

      <div className="pokemon-types">
        {pokemon.type.map((type) => (
          <img key={type} src={typeImages[type]} alt={type} className="type-image" />
        ))}
      </div>

      <div className="pokemon-stats">
        {Object.entries(pokemon.base).map(([stat, value]) => (
          <p key={stat}><strong>{stat}:</strong> {value}</p>
        ))}
      </div>

      {/* Bouton "Voir les détails" */}
      <a href={`/pokemon/${pokemon.id}`} className="details-button">
        Voir les détails
      </a>
    </div>
  );
}

export default PokemonCard;
