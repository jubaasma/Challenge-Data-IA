import React from 'react';
import Form from './regform'
import './bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function app3() {
    return (
      <div className='appmain'>
           <div>
              <h2>Prediction des prix des voitures</h2>
          </div>
          <div class="container-fluid">
              <div class="row">
                  <div class="col-md-6">
                      <Form />
                  </div>
              </div>
          </div>
          {/* Ajoutez ici d'autres composants et sections selon vos besoins */}
      </div>
    );
  }
  
export default app3;
  