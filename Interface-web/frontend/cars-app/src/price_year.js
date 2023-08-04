import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plotly from 'react-plotly.js';

function Cars() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/cars')
      .then(response => {
        const averages = response.data.reduce((acc, car) => {
          acc[car.year] = (acc[car.year] || { sum: 0, count: 0 });
          acc[car.year].sum += car.Prix;
          acc[car.year].count += 1;
          return acc;
        }, {});
        const years = Object.keys(averages).sort();
        const avgPrices = years.map(year => averages[year].sum / averages[year].count);
        setData({ years, avgPrices });
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div >
      <Plotly
        data={[
          {
            x: data.years,
            y: data.avgPrices,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{ title: 'Prix moyen des voitures par année' }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default Cars;