import React from 'react';

import './Pokemon.css';

const Pokemon = ({ data, onClick }) => {
  return (
    <img
      className='sprite clickable'
      src={data.sprites.front_default}
      width='200px'
      onClick={() => { onClick(data) }}
    />
  );
};

export default Pokemon;
