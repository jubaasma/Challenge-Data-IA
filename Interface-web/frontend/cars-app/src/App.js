import React from 'react';

import Plot_year from './plot_year';
import Plot_energy from './plot_energy';
import './bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Top10 from './top10'



function App() {
  return (
    <div className='appmain'>
        <h2>Statistiques sur les données</h2>
        {/* <div className='App1' >
            
            <div className="Graphplot1">
                <Plot_year />
            </div>
            <div className="Graphplot2">
                <Plot_energy />
            </div>
            <div className="Graph1">
                <Prices />
            </div>
        </div> */}
        
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4">
                     <Plot_year />
                </div>
                <div class="col-md-4">
                <Plot_energy />
                </div>
                <div class="col-md-4">
                <Top10 />
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;