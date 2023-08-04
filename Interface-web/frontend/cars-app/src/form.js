import React, { useState } from 'react';
import axios from 'axios';

const CarForm = () => {
  const [formData, setFormData] = useState({
    year: '',
    fuelType: '',
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/predict', formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Erreur lors de la prédiction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Année:
        <input type="number" name="year" value={formData.year} onChange={handleChange} />
      </label>
      <label>
        Type de carburant:
        <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
          <option value="Gasoline">Essence</option>
          <option value="Diesel">Diesel</option>
          {/* Ajouter d'autres types de carburant si nécessaire */}
        </select>
      </label>
      <button type="submit">Prédire le prix</button>
      {prediction && <div>Prix prédit: {prediction}€</div>}
    </form>
  );
};

export default CarForm;
