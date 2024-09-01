import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBox from './components/SearchBox';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => {
        const promises = response.data.results.map(pokemon =>
          axios.get(pokemon.url).then(res => res.data)
        );
        Promise.all(promises).then(results => setPokemonData(results));
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredPokemon = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Pokémon List</h1>
      <SearchBox handleSearchChange={handleSearchChange} />
      <div className="pokemon-list">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
