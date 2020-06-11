import React from 'react';

import './Pokemon.css';

const Pokemon = ({ data, onClick }) => {
  return (
    <img
      className='sprite clickable'
      src={data.sprites.front_default}
      alt={data.name}
      width='150px'
      onClick={() => { onClick(data) }}
    />
  );
};

export default Pokemon;
