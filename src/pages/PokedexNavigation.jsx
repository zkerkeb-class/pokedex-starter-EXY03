import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/DisplayCard';
import { getAllPokemons } from '../services/api';
import { useNavigate } from 'react-router';

function PokedexNavigation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [isLoggedOut, setIsLoggedOut] = useState(!localStorage.getItem("token"));
  const [currentPage, setCurrentPage] = useState(1);  // Nouvelle variable d'état pour la page courante
  const pokemonsPerPage = 21;  // Nombre de pokemons à afficher par page
  const navigate = useNavigate();

  const loadPokemons = async () => {
    const data = await getAllPokemons();
    setPokemons(data);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleTypeChange = (e) => setSelectedType(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedOut(true);
    alert("Déconnexion réussie !");
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const uniqueTypes = Array.from(new Set(pokemons.flatMap(pokemon => pokemon.type)));

  // Appliquer la recherche, le type et le tri à l'ensemble des pokemons avant la pagination
  let filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? pokemon.type.includes(selectedType) : true;
    return matchesSearch && matchesType;
  });

  if (sortOrder) {
    filteredPokemons = filteredPokemons.sort((a, b) => {
      return sortOrder === 'asc'
        ? a.name.french.localeCompare(b.name.french)
        : b.name.french.localeCompare(a.name.french);
    });
  }

  // Pagination : calculer le nombre de pages et la portion de pokemons à afficher
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pokedex-navigation">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          {isLoggedOut ? (
            <button onClick={handleLoginRedirect} className="login-button">Se connecter</button>
          ) : (
            <button onClick={handleLogout} className="logout-button">Déconnexion</button>
          )}
        </div>
        <h1 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Pokédex</h1>
      </header>

      <div className="search-filter-container">
        <div className="search-container">
          <input type="text" placeholder="Rechercher un Pokémon..." value={searchTerm} onChange={handleSearch} className="search-bar" />
        </div>
        <div className="filter-container">
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
        {currentPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Précédent</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Suivant</button>
      </div>
    </div>
  );
}

export default PokedexNavigation;
