import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const Regression = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/regression').then((response) => {
      const { predictions: y_pred, y_test } = response.data;
      setData({
        y_test,
        y_pred,
      });
    });
  }, []);

  return (
    <div>
      {data ? (
        <Plot
          data={[
            {
              x: data.y_test,
              y: data.y_pred,
              mode: 'markers',
              type: 'scatter',
              name: 'Points',
              marker: { color: 'blue', opacity: 0.5 },
            },
            {
              x: data.y_test,
              y: data.y_test, // ligne y=x pour représenter la régression
              mode: 'lines',
              name: 'Regression Line',
              line: { color: 'red' },
            },
          ]}
          layout={{ title: 'Actual vs. Predicted Values with Regression Line', xaxis: { title: 'Actual Values' }, yaxis: { title: 'Predicted Values' } }}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Regression;
