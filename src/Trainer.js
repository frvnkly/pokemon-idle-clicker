import React, { useState, useEffect } from 'react';
import Pokedex from 'pokedex-promise-v2';

import './Trainer.css';
import Pokemon from './Pokemon';

const Trainer = ({ pokemon, allPokemon }) => {
  const P = new Pokedex();

  const [species, setSpecies] = useState(pokemon.data);
  const [fullyEvolved, setFullyEvolved] = useState(pokemon.fullyEvolved);
  const [level, setLevel] = useState(pokemon.level);
  const [exp, setExp] = useState(pokemon.exp);

  // commits updates to Pokemon level and exp
  useEffect(() => {
    return () => {
      const current = allPokemon.get(pokemon.id);
      current.level = level;
      current.exp = exp;
    }
  });

  const trainPokemon = async () => {
    const newExp = exp + 10;

    if (newExp >= 100) {
      const newLevel = level + 1;
      if (newLevel >= 10 && !fullyEvolved) {
        const currSpecies =
          await P.getPokemonSpeciesByName(species.species.name);        
        const evolutionChain =
          await P.resource(currSpecies.evolution_chain.url);

        let ptr = evolutionChain.chain;
        while (ptr.species.name !== species.name && ptr.evolves_to.length) {
          ptr = ptr.evolves_to[0];
        }

        const nextEvolution = await P.getPokemonByName(ptr.evolves_to[0].species.name);
        console.log(nextEvolution);
        setSpecies(nextEvolution);
        setLevel(1);
        setExp(0);
      } else {
        setLevel(newLevel);
        setExp(newExp - 100);
      }
    } else {
      setExp(newExp);
    }
  };

  return (
    <div className='trainer has-text-centered'>
      <p>Click to train</p>
      <Pokemon data={species} onClick={trainPokemon} />
      <p>Lv{level}</p>
      <label>EXP</label>
      <progress
        className='exp-bar progress is-info'
        value={exp}
        max='100'
      >
        {exp}
      </progress>
    </div>
  );
};

export default Trainer;
