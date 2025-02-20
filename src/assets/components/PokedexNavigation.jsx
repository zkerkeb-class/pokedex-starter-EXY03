import React, { useState } from 'react';
import pokemons from '../pokemons';
import PokemonCard from './DisplayCard';

function PokedexNavigation() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filteredPokemons = searchTerm
    ? pokemons.filter((pokemon) =>
        pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : pokemons;

  return (
    <div className="pokedex-navigation">
      <header>
        <h1>Pokédex</h1>
      </header>
      <input type="text" placeholder="Rechercher un Pokémon..." value={searchTerm} onChange={handleSearch} className="search-bar" />
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default PokedexNavigation;
