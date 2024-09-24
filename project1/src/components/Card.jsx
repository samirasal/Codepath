import React from 'react';
import '../Card.css';

const Card = ({ name, description, features, link }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{description}</p>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button>Learn More</button>
      </a>
    </div>
  );
};

export default Card;
