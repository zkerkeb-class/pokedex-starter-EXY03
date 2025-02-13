import React, { useState } from 'react';
import pokemons from '../pokemons';
import PokemonCard from './DisplayCard';

function PokedexNavigation() {
  const [selectedPokemon, setSelectedPokemon] = useState(pokemons[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.french.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPokemons(filtered);
    } else {
      setFilteredPokemons([]);
    }
  };

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setSearchTerm(pokemon.name.french);
    setFilteredPokemons([]);
  };

  return (
    <div className="pokedex-navigation">
      <header>
        <h1>Pokédex</h1>
      </header>
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      {filteredPokemons.length > 0 && (
        <ul className="suggestions">
          {filteredPokemons.map((pokemon) => (
            <li key={pokemon.id} onClick={() => handleSelectPokemon(pokemon)}>
              {pokemon.name.french}
            </li>
          ))}
        </ul>
      )}
      <div className="pokemon-selector">
        <label htmlFor="pokemon-select">Choisissez un Pokémon :</label>
        <select
          id="pokemon-select"
          value={selectedPokemon.id}
          onChange={(e) =>
            setSelectedPokemon(pokemons.find((p) => p.id === parseInt(e.target.value)))
          }
        >
          {pokemons.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {pokemon.name.french}
            </option>
          ))}
        </select>
      </div>
      <PokemonCard pokemon={selectedPokemon} />
    </div>
  );
}

export default PokedexNavigation;
