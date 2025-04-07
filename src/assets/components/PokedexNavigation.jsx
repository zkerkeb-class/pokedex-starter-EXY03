import React, { useEffect, useState } from 'react';
// import pokemons from '../pokemons';
import PokemonCard from './DisplayCard';
import { getAllPokemons } from '../../services/api';


function PokedexNavigation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [pokemons, setPokemons] = useState([]);

  const loadPokemons = async () =>{
    const data = await getAllPokemons();
    setPokemons(data)
  }

  useEffect(() =>{
    loadPokemons();
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const uniqueTypes = Array.from(new Set(pokemons.flatMap(pokemon => pokemon.type)));

  let filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? pokemon.type.includes(selectedType) : true;
    return matchesSearch && matchesType;
  });

  if (sortOrder) {
    filteredPokemons = filteredPokemons.sort((a, b) => {
      return sortOrder === 'asc' ? a.name.french.localeCompare(b.name.french) : b.name.french.localeCompare(a.name.french);
    });
  }


  return (
    <div className="pokedex-navigation">
      <header>
        <h1>Pokédex</h1>
      </header>
      <div className="search-filter-container">
        <div className="search-container">
          <input type="text" placeholder="Rechercher un Pokémon..." value={searchTerm} onChange={handleSearch} className="search-bar" />
        </div>
        <div className='filter-container'>
          <select value={selectedType} onChange={handleTypeChange} className="type-filter">
            <option value="">Tous les types</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select value={sortOrder} onChange={handleSortChange} className="sort-filter">
            <option value="">Aucun tri</option>
            <option value="asc">Nom: A-Z</option>
            <option value="desc">Nom: Z-A</option>
          </select>
        </div>
      </div>

      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default PokedexNavigation;
