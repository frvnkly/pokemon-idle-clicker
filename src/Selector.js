import React from 'react';

import './Selector.css';
import Pokemon from './Pokemon';

const Selector = ({ pokemon, select }) => {
  return (
    <div className='selector has-text-centered'>
      <p>Pick your starter Pokemon:</p>
      {pokemon.map(p => (
        <Pokemon key={p.id} data={p} onClick={select} />
      ))}
    </div>
  );
};

export default Selector;
