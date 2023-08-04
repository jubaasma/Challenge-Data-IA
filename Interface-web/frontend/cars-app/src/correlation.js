import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plotly from 'react-plotly.js';

function Correlation() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/correlation')
      .then(response => setData(JSON.parse(response.data)))
      .catch(error => console.error(error));
  }, []);

  // Prépare les données pour le graphique
  let xLabels = [];
  let yLabels = [];
  let values = [];

  if (data) {
    xLabels = Object.keys(data);
    yLabels = xLabels; // Les étiquettes des axes x et y sont les mêmes
    values = xLabels.map(key => xLabels.map(subKey => data[key][subKey]));
  }

  return (
    <div>
      {data && (
        <Plotly
          data={[
            {
              z: values,
              x: xLabels,
              y: yLabels,
              type: 'heatmap',
              colorscale: 'Viridis',
            },
          ]}
          layout={{ title: 'Matrice de Corrélation', xaxis: { tickangle: 45 } }}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
}

export default Correlation;