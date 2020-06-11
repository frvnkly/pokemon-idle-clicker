import React, { useState, useLayoutEffect } from 'react';
import Pokedex from 'pokedex-promise-v2';
import 'bulma/css/bulma.css';

import './App.css';
import Selector from './Selector';
import Trainer from './Trainer';

const App = () => {
  const P = new Pokedex();

  const [starters, setStarters] = useState([]);
  const [active, setActive] = useState(null);
  const [allPokemon] = useState(new Map());

  const fetchStarters = async () => {
    const starterNames = ['bulbasaur', 'charmander', 'squirtle',];
    const starters = await Promise.all(
      starterNames.map(s => P.getPokemonByName(s))
    );
    setStarters(starters);
  };
  useLayoutEffect(() => { fetchStarters() }, []);

  const selectStarter = (pokemon) => {
    allPokemon.set(0, { id: 0, level: 1, exp: 0, fullyEvolved: false, data: pokemon });
    setActive(allPokemon.get(0));
  };

  return (
    <div className="App container">
      <div className='main card'>
        {active
          ? <Trainer pokemon={active} allPokemon={allPokemon} />
          : <Selector pokemon={starters} select={selectStarter} />         
        }
      </div>
    </div>
  );
};

export default App;
