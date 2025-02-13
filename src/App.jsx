import { useState } from 'react';
import './App.css';
import pokemons from './assets/pokemons';
import { pokemonImages } from './assets/imageLibrary';
import { typeImages } from './assets/typesLibrary';

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <h2>{pokemon.name.french}</h2>
      <img src={pokemonImages[pokemon.id]} alt={pokemon.name.english} className="pokemon-image" />

      <div className="pokemon-types">
        {pokemon.type.map((type) => ( //.map pour parcourir les tableaux
          <img key={type} src={typeImages[type]} alt={type} className="type-image"/>
          ))}
      </div>

      <div className="pokemon-stats">
        {Object.entries(pokemon.base).map(([stat, value]) => (
          <p key={stat}><strong>{stat}:</strong> {value}</p>
        ))}
      </div>

    </div>
  );
}

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(pokemons[0]);

  return (
    <div className="app">
      <header>
        <h1>Pokédex</h1>
      </header>
      <div className="pokemon-selector">
        <label htmlFor="pokemon-select">Choisissez un Pokémon :</label>
        <select
          id="pokemon-select"
          value={selectedPokemon.id}
          onChange={(e) => setSelectedPokemon(pokemons.find(p => p.id === parseInt(e.target.value)))}
        >
          {pokemons.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>{pokemon.name.french}</option>
          ))}
        </select>
      </div>
      <PokemonCard pokemon={selectedPokemon} />
    </div>
  );
}

export default App;
