// src/components/SpeciesChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const SpeciesChart = ({ characters }) => {
  const speciesData = [
    { name: 'Human', value: characters.filter(c => c.species === 'Human').length },
    { name: 'Alien', value: characters.filter(c => c.species === 'Alien').length },
    { name: 'Other', value: characters.filter(c => !['Human', 'Alien'].includes(c.species)).length },
  ];

  return (
    <BarChart width={500} height={300} data={speciesData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#82ca9d" />
    </BarChart>
  );
};

export default SpeciesChart;
