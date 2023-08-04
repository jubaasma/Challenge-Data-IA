import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plotly from 'react-plotly.js';

function Cars() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Ajustez cette URL selon l'URL de votre API Flask
    axios.get('http://127.0.0.1:5000/api/cars')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div style={{height: '80%'}}>
      <Plotly
        data={[
          {
            x: data.map(car => car.year),
            y: data.map(car => car.Prix),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{ title: 'Prix des voitures par année' }}
      />
    </div>
  );
}


export default Cars;



//import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Cars() {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/api/cars')
//       .then(response => {
//         setCars(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>List of Cars</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Price</th>
//             <th>Year</th>
//             <th>Origin</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cars.map((car, index) => (
//             <tr key={index}>
//               <td>{car.Prix}</td> {/* J'ai utilisé "Prix" ici */}
//               <td>{car.year}</td> {/* J'ai utilisé "year" ici */}
//               <td>{car.origin}</td> {/* J'ai utilisé "origin" ici */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Cars
