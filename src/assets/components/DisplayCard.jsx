import { pokemonImages } from '../imageLibrary';
import { typeImages } from '../typesLibrary';

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <h2>{pokemon.name.french}</h2>
      <div>
        <img src={pokemonImages[pokemon.id]} alt={pokemon.name.english} className="pokemon-image" />
      </div>
      

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

export default PokemonCard;