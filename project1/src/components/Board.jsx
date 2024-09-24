import React from 'react';
import Card from './Card.jsx';
import data from '../data.js';

const Board = () => {
  return (
    <div className="board">
      {data.map((item, index) => (
        <Card
          key={index}
          name={item.name}
          description={item.description}
          features={item.features}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default Board;
