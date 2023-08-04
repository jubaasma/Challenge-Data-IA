import React, { useState } from 'react';
import axios from 'axios';

function RegressionForm() {
  const [formData, setFormData] = useState({
    year: '',
    doors: '',
    mileage_value: '',
    co2_value: '',
    powerDIN_value: '',
    ratedHorsePower_value: '',
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/regressionform', formData);
      setPrediction(response.data.prediction[0]);
    } catch (error) {
      console.error('There was an error fetching the prediction:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" name="year" onChange={handleChange} placeholder="Year" required />
        <input type="number" name="doors" onChange={handleChange} placeholder="Doors" required />
        <input type="number" name="mileage_value" onChange={handleChange} placeholder="Mileage" required />
        <input type="number" name="co2_value" onChange={handleChange} placeholder="CO2 Value" required />
        <input type="number" name="powerDIN_value" onChange={handleChange} placeholder="Power DIN Value" required />
        <input type="number" name="ratedHorsePower_value" onChange={handleChange} placeholder="Rated HorsePower Value" required />
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>The predicted price is: {prediction}</p>}
    </div>
  );
}

export default RegressionForm;
