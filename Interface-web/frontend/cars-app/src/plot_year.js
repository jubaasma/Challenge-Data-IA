import React, { useEffect, useState } from 'react';
import Plotly from 'react-plotly.js';
import axios from 'axios';

function YearDistribution() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/year_distribution')
      .then(response => {
        const years = Object.keys(response.data);
        const counts = Object.values(response.data);
        setData([{ x: years, y: counts, type: 'bar',
        marker: {
            color: counts, // Utiliser les compteurs pour déterminer la couleur
            colorscale: 'Viridis' // Utiliser l'échelle de couleurs Viridis
          } }]);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Plotly
        data={data}
        layout={{ title: 'Nombre de voitures par années' }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default YearDistribution;