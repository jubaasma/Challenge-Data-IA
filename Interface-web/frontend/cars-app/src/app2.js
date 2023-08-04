import React from 'react';
import Correlation from './correlation';
import Regression from './predicition'
import './bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App2() {
  return (
    <div className='appmain'>
         <div>
            <h2>Application de l'IA/ML sur les données</h2>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <Correlation />
                </div>
                <div class="col-md-6">
                    <Regression />
                </div>
            </div>
        </div>
        {/* Ajoutez ici d'autres composants et sections selon vos besoins */}
    </div>
  );
}

export default App2;
