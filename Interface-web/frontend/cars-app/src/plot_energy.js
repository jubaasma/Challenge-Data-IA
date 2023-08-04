import React, { useEffect, useState } from 'react';
import Plotly from 'react-plotly.js';
import axios from 'axios';

function FuelDistribution() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/enregy_distribution') // Remplacez ceci par votre URL d'API
      .then(response => {
        const fuelTypes = Object.keys(response.data);
        const counts = Object.values(response.data);
        setData([{ x: fuelTypes, y: counts, type: 'bar',
        marker: {
            color: counts, // Utiliser les compteurs pour déterminer la couleur
            colorscale: 'Viridis' // Utiliser l'échelle de couleurs Viridis
          }
    }]);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Plotly
        data={data}
        layout={{ title: 'Nombre de voitures par type de carburant' }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default FuelDistribution;