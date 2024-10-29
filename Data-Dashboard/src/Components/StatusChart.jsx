// src/components/StatusChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const StatusChart = ({ characters }) => {
  const data = [
    { name: 'Alive', value: characters.filter(c => c.status === 'Alive').length },
    { name: 'Dead', value: characters.filter(c => c.status === 'Dead').length },
    { name: 'Unknown', value: characters.filter(c => c.status === 'unknown').length },
  ];

  const colors = ['#00C49F', '#FF8042', '#8884D8'];

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default StatusChart;
